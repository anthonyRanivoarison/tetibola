import {
  getUserProfile,
  createUserProfile,
  updateFirstName,
  updateLastName
}
  from "../models/profileDB.js";



export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await getUserProfile({ userId });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(profile);
  } catch (err) {

    console.log("Error to get profile:", err);
    res.status(500).json({ message: "Server error" });

  }
};


export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;
    const data = await getUserProfile({ userId });

    if (!lastName) {
      return res.status(400).json({ message: "Last name is required" });
    }

    if (data) {
      return res.status(409).json({ message: "Profile already exists" });
    }

    const newUserProfile = await createUserProfile({ firstName, lastName, userId });
    return res.status(201).json(newUserProfile);
  }
  catch (err) {
    console.error("Error to  create user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;
  console.log(req.body)

    let updatedUser;

    if (firstName && lastName) {
      updatedUser = await createUserProfile({ firstName, lastName, userId });
    }
    else if (firstName) {
      updatedUser = await updateFirstName({ firstName, userId });
    }
    else {
      updatedUser = await updateLastName({ lastName, userId });
    }

    return res.status(200).json(updatedUser);

  } catch (err) {
    console.error("Erreur updateProfile:", err);
    console.log(err, "err")
    res.status(500).json({ message: err });
  }
};