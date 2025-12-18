import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({
  plants,
  searchText,
  onSearchTextChange,
  onAddPlant,
  onToggleSoldOut,
  onDeletePlant,
}) {
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search searchText={searchText} onSearchTextChange={onSearchTextChange} />
      <PlantList plants={plants} onToggleSoldOut={onToggleSoldOut} onDeletePlant={onDeletePlant} />
    </main>
  );
}

export default PlantPage;