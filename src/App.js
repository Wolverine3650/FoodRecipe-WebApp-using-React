import React,{useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import "./App.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
const App=()=>{
    const[query,setquery]=useState("");
    const[recipes,setRecipies]=useState([]);
    const[alert,setAlert]=useState("");
    const APP_ID="ab5f4b8a";
    const APP_KEY="179a444c2a78499ff13a4f2600533675";
    const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
   const getData=async()=>{
       if(query!==""){
        const result=await Axios.get(url);
        if(!result.data.more){
            return setAlert("NO food with such name!!");
        }
        setRecipies(result.data.hits);
        console.log(result);
        setAlert("");
        setquery("");
       }
      else {
          setAlert("Please type something!!!!");
      }
      
   };
   const onChange=(e)=>{
       setquery(e.target.value);
   }
   const onSubmit =(e)=>{
      e.preventDefault();
      getData();
   }
    return(
        <div className="App">
            <h1>Food searching App</h1>
          <form className="search-form" onSubmit={onSubmit}>
              {alert!=="" && <Alert  alert={alert}/>}
              <input type="text" placeholder="SearchFood" autoComplete="off" onChange={onChange}
              value={query}
              />
              <input type="submit" value="search"/>
          </form>
         <div className="recipes">
             {recipes!==[] && recipes.map(recipe=> <Recipe key={uuidv4()} recipe={recipe}/>)}
         </div>
        </div>
    );
};

export default App;