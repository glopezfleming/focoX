import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import useGetUserID from "../hooks/useGetUserID";


const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID();


  useEffect(() =>{


    const fetchSavedRecipe = async () => {
      try{
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
      }catch(err){
        console.log(err)
      }
    }
    
    fetchSavedRecipe();

  }, []);



  return (

    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe)=>(
          <li key = {recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>Saved</h1>}
            <div>
              <h2>{recipe.name}</h2>
        
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src = {recipe.imageURL} alt = {recipe.name}></img>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SavedRecipes