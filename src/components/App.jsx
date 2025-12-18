import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

const BASE_URL = "http://localhost:6001";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchText, setSearchText] = useState("");

  //see all plants on page load
  useEffect(() => {
    fetch(`${BASE_URL}/plants`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch plants");
        return r.json();
      })
      .then((data) => {
        //default missing inStock to true so initial button is "In Stock"
        const normalized = data.map((p) => ({
          ...p,
          inStock: p.inStock ?? true,
        }));
        setPlants(normalized);
      })
      .catch((err) => console.error(err));
  }, []);

  //search by name (case-insensitive)
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  //add a new plant by submitting the form (POST then update state)
  function handleAddPlant(newPlant) {
    fetch(`${BASE_URL}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to create plant");
        return r.json();
      })
      .then((createdPlant) =>
        setPlants((prev) => [
          ...prev,
          //normalize created plant too (does NOT affect POST body)
          { ...createdPlant, inStock: createdPlant.inStock ?? true },
        ])
      )
      .catch((err) => console.error(err));
  }

  //mark plant as "sold out" (non-persisting: state only)
  function handleToggleSoldOut(id) {
    setPlants((prev) =>
      prev.map((plant) => {
        if (plant.id !== id) return plant;

        //treat missing as true, then flip
        const currentlyInStock = plant.inStock ?? true;
        return { ...plant, inStock: !currentlyInStock };
      })
    );
  }

  function handleDeletePlant(id) {
    setPlants((prev) => prev.filter((plant) => plant.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={plantsToDisplay}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onAddPlant={handleAddPlant}
        onToggleSoldOut={handleToggleSoldOut}
        onDeletePlant={handleDeletePlant}
      />
    </div>
  );
}

export default App;