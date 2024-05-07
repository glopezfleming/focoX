import React from 'react'
import {useState} from 'react';
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const userID = useGetUserID();
  const[recipe, setRecipe] = useState({
    name: "",
    instructions: "",
    imageURL: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value})
  }

  const onSubmit = async (event) =>{
    event.preventDefault();
    try{
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe Created")
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className = "create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit = {onSubmit}>
        <label htmlFor = "name"> Name</label>
        <input type="text" id = "name" name = "name" onChange = {handleChange}></input>

        <label htmlFor = "instructions"> Instructions</label>
        <textarea id="instructions" name = "instructions" onChange = {handleChange}></textarea>

        <label htmlFor = "imageURL"> Image URL</label>
        <input type="text" id = "imageURL" name = "imageURL" onChange = {handleChange}></input>

        <button type = "submit"> Create Recipe</button>

      </form>
    
    
    </div>
  )
}

export default CreateRecipe