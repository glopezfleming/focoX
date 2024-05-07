import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import useGetUserID from "../hooks/useGetUserID";


const Home = () => {
  const [recipes, setRecipes] = useState([])
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() =>{
    const fetchRecipe = async () => {
      try{
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data)

      }catch(err){
        console.log(err)
      }
    }

    const fetchSavedRecipe = async () => {
      try{
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
      }catch(err){
        console.log(err)
      }
    }




    fetchRecipe();
    fetchSavedRecipe();

  }, []);

  const saveRecipe = async (recipeID) =>{
    try{
      const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID});
      setSavedRecipes(response.data.savedRecipes)

    }catch(err){
      console.log(err)
    }
  } 

  const isRecipeSaved = (id) => savedRecipes.includes(id);


  return (

    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe)=>(
          <li key = {recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>Saved</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <button onClick = {() => saveRecipe(recipe._id)} disabled = {isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
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

export default Home