import crypto from "crypto";
import nodemailer from "nodemailer";
import 'dotenv/config';
import { insertUserData, findUserEmail } from "../models/authDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mailSender = (receiverEmail, content) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.GMAIL_WEBAPP_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: `${receiverEmail}`,
        subject: `Verification code: ${content}`,
        text: `Hi there,

    We noticed a verification code request to this e-mail. If that was you, enter this code: ${content}`
    };

    return transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error " + err);
        }
        else {
            console.log("Email sent successfully");
        }
    });
}

const sanitizeAndValidEmail = (email) => {
    const allowedChar = /^[\w.@]+$/;
    const validEmail = /^[\w][\w.-]*@[\w-]+\.[\w-]+(\.[\w-]+)?$/;

    if (!email){
        return {Message: 'email required'};
    }
    if (!allowedChar.test(email)){
        return { Message: 'The email contain invalid characters'};
    }
    if (!validEmail.test(email)){
        return { Message: 'The email is invalid'};
    }
    return null;
}

const memory = new Map()
const passGen = () => {
    let pass = "";
    for (let i = 0; i < 10; i++){
        let randomDigit = crypto.randomInt(65, 90);
        pass += String.fromCharCode(randomDigit);
    }
    return pass;
}

const getPasswordHash = async (password) => {
    try {
        return await bcrypt.hash(password, 11);
    } catch (err) {
        console.error(err);
    }
}

export const userCreation = async (req, res) => {
    const {email, password, confirmPassword} = req.body;

    const invalidEmail = sanitizeAndValidEmail(email);
    if (invalidEmail) {
        return res.status(400).json(invalidEmail);
    }

    const existingEmail = await findUserEmail(email);
    if (existingEmail.rows[0].email === email) {
        return res.status(400).json({ Message: 'Email already exists' });
    }

    const verificationCode = passGen();
    if (!password || !confirmPassword) {
        return res.status(400).json({Message: "Password or confirmation password field is required"});
    }

    if (confirmPassword !== password) {
        return res.status(400).json({Message: "Passwords do not match"});
    }

    if (password.length < 12) {
        return res.status(400).json({Message: "Password must be at least 12 character"});
    }

    if (!/[A-Z]/.test(password)) {
        return res.status(400).send({Message: "Password must have contain least one uppercase letter"});
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).send({Message: "Password must contain at least one lowercase letter"});
    }
    if (!/[0-9]/.test(password)) {
        return res.status(400).send({Message: "Password must contain at least one digit"});
    }
    if (!/[*?~#_+!&%$@.]/.test(password)) {
        return res.status(400).send({Message: "Password must contain at least one of these specials characters: *?~#_+!&%$@."});
    }

    memory.set("verificationCode", verificationCode);
    memory.set("password", password);
    memory.set("email", email);

    await mailSender(email, verificationCode)
    return res.status(200).json({Message: `An email will be send to ${email} to confirm registration`});

}

export const verifyEmail = async (req, res) => {
    const { clientCode } = req.body;
    const verificationCode = memory.get("verificationCode");
    const email = memory.get("email");
    const password = await getPasswordHash(memory.get("password"));
    const allowedInput = /^[A-Z]+$/;

    if (!clientCode){
        return res.status(400).send({ Message: "This field is required" });
    }
    if (!allowedInput.test(clientCode)){
        return res.status(400).json({ message: 'The verification code contain an invalid character'});
    }
    if (clientCode === verificationCode){
        const userDataInserted = await insertUserData(email, password);
        if (!userDataInserted){
            return res.status(500).send({ Message: "An error occurred please try again later" });
        }
        return res.status(200).send({ Message: "Registration success, you can log in" });
    }
    return res.status(400).send({ Message: "Email verification failed" });
}
