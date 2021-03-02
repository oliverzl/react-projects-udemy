//this url here https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007 is responsible for the single cocktail details.

//this url here https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita is responsible for the full list of cocktails

import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktails } = useGlobalContext();

  //conditional returns based on states of the react app:
  //only if its not loading, and there are elements in cocktails array : cocktails.length ! < 1
  if (loading) {
    return <Loading />;
  }

  if (cocktails.length < 1) {
    return (
      <h2 className='section-title'>
        No cocktails matched your search criteria
      </h2>
    );
  }
  return (
    <section className='section'>
      <h2 className='section-title'>Cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
