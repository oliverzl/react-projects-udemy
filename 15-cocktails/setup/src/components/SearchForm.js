//every time we type, we invoke the function setSearchTerm, and we pass in the value that comes in through the form.

//we are going with an uncontrolled input
//useRef
import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  //immediately destructuring the setSearchTerm from the object returned from useGlobalContext();
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef("");

  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  //will focus on the search box every time the app MOUNTS.
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <section className='section search'>
      <form action='' className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search your Favourite Cocktail</label>
          <input
            type='text'
            id='name'
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
