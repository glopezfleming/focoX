import React from 'react'
import {useState} from 'react';
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const[cookies, _] = useCookies(["access_token"]);
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
      await axios.post("http://localhost:3001/recipes", recipe, {headers: {authorization: cookies.access_token}});
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