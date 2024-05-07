import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    instructions: {type: String, required :true},
    imageURL: {type: String, required: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
})

export const RecipeModel = mongoose.model("recipes", RecipeSchema)