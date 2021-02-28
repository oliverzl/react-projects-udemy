import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  //FUNCTIONS
  const fetchDrinks = async () => {
    //here, we immediately set up a try catch block. we try to fetch the list of cocktails, and if it fails, we can handle the error properly.
    //essentially function fetchDrinks will be called whenever we type something into the input, setLoading also needs to be set to false when the list is fetched.
    try {
      //data can exist, or be null. if it is null, it technically isn't an error, because there's just no data, it's not a response error.
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm]);
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
