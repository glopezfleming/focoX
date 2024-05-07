import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import {userRouter} from './routes/users.js'
const app = express()

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter)

mongoose.connect("mongodb+srv://glopezfleming:123DaliApp@focorecipes.vadyfgx.mongodb.net/?retryWrites=true&w=majority&appName=focoRecipes")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3001, () => console.log("SERVER STARTED!"));
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    });
