// inifite scroll of image search

//site name is unsplash, so we need to create an account.

import React, { useState, useEffect } from "react";
import { FaSearch, FaSearchPlus } from "react-icons/fa";
import Photo from "./Photo";

//we will first set up our environment variables

//from env file
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

//env variables, are not specific to react or CRA
//beware!!! env variables normally come from the node

//read more on CRA env variables search on google

//place the env file as the sibling of .gitignore file

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  //useState
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    let url;

    //read documentation and figure out how to access the public key, DO NOT PANIC

    //currently, this url is MY PERSONAL ACCOUNT KEY which i use to access the unsplash API, but this is not the best practice, so it is best to set up the ENV file to the gitignore, so when we push this up to github, we can only see the name of the value, NOT THE ACTUAL API key
    url = `${mainUrl}${clientID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
  };
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input type='text' placeholder='search' className='form-input' />
          <button className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo) => {
            console.log(photo);
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className='loading'>Loading... </h2>}
      </section>
    </main>
  );
}

export default App;

//MFCgEaUu3In9qMhaDTZyik3liI01FxAtDd6EhgVADSU;
