import { useState, useEffect } from "react";
import paginate from "./utils";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();

    //the setData here is the return for the useFetch custom hook.
    setData(paginate(data));
    setLoading(false);
  };

  //this is the custom hook useFetch, and it has a useEffect that runs on mount. it gets the list of followers from the API, and returns an object, with the values for loading and the array of followers
  useEffect(() => {
    getProducts();
  }, []);
  return { loading, data };
};
