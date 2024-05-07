import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://glopezfleming:123DaliApp@focorecipes.vadyfgx.mongodb.net/?retryWrites=true&w=majority&appName=focoRecipes")

app.listen(3001, () => console.log("SERVER STARTED!"));
