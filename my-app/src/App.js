import './App.css';
import Axios from "axios";
import { useState } from "react";
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegan")

  const YOUR_APP_ID = "118daa23";
  const YOUR_APP_KEY = "a15d53d829c4e7cd4df7852521eb9a08";
  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=
  ${YOUR_APP_KEY}&health=${healthLabels}`;

  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);

  }


  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };
  return (
    <div className="app">
      <h1> Healthy Breakfast </h1>
      <form className="app_searchForm" onSubmit={onSubmit}>
        <input
          type="text"
          className="app_input"
          placeholder="enter ingredient"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app_submit" type="submit" value="Search" />
        <select className="app_healthLabels">

          <option onClick={() => sethealthLabels("vegan")}>Vegan</option>
          <option
            value="vegetarian"
            onClick={() => sethealthLabels("vegetarian")}
          >
            Vegetarian</option>
          <option onClick={() => sethealthLabels("paleo")}>Paleo</option>
          <option onClick={() => sethealthLabels("dairy-free")}>Dairy-free</option>
          <option onClick={() => sethealthLabels("wheat-bread")}>Wheat-bread</option>
          <option onClick={() => sethealthLabels("tree-nut-free")}>tree-nut-free</option>
          <option onClick={() => sethealthLabels("peanut-free")}>peanut-free</option>
          <option onClick={() => sethealthLabels("egg-free")}>egg-free</option>



        </select>
      </form>

      <div className="app_recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />;

        })}

      </div>

    </div>
  );
}

export default App;
