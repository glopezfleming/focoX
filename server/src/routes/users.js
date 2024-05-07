import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import {UserModel} from '../models/Users.js'

const router = express.Router()
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (user) {
            console.log("User already exists:", username);
            return res.json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        console.log("User registered successfully:", username);
        res.json({ message: "User Registered Successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});




export {router as userRouter}