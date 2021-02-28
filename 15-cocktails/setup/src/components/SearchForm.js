//every time we type, we invoke the function setSearchTerm, and we pass in the value that comes in through the form.
import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  //immediately destructuring the setSearchTerm from the object returned from useGlobalContext();
  const { setSearchTerm } = useGlobalContext();

  return <h2>SearchFormComponent</h2>;
};

export default SearchForm;
