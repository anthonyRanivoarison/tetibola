import {    
            getUserProfile,
            createUserProfile,
            updateFirstName,
            updateLastName
        }
from "../models/profileDB.js";



export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const profile = await getUserProfile({ userId });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(profile);
  } catch (err) {

    console.log("Erreur to get profil:", err);
    res.status(500).json({ message: "Erreur serveur" });
    
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { firstName, lastName } = req.body;

    if (!firstName && !lastName) {
      return res.status(400).json({ message: "At least one field is required" });
    }

    let updatedUser;

    if (firstName && lastName) {
      updatedUser = await createUserProfile({ userId, firstName, lastName });
    } else if (firstName) {
      updatedUser = await updateFirstName({ userId, firstName });
    } else if (lastName) {
      updatedUser = await updateLastName({ userId, lastName });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Erreur updateProfile:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};