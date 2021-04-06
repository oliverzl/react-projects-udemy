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
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;

    //read documentation and figure out how to access the public key, DO NOT PANIC

    //currently, this url is MY PERSONAL ACCOUNT KEY which i use to access the unsplash API, but this is not the best practice, so it is best to set up the ENV file to the gitignore, so when we push this up to github, we can only see the name of the value, NOT THE ACTUAL API key

    const urlPage = `&page=${page}`;

    //we only use this url if there is a query to being with
    const urlQuery = `&query=${query}`;

    //this is the if statement to check if there is a query, then we use the search url. else, we will use the default set up

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((oldPhotos) => {
        if (query && page == 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else if (!query) {
          return data;
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //this useEffect fetches the data, refetch data when page state changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  //** MY OWN ADDITION: this is a useEffect that will run whenever there is something in query.
  //the issue is, the default page state is 0. when a submit query is performed, page state changes to one, and the default images are replaced with the new query.
  //what if we want to query again?
  //since after the query, the
  // useEffect(() => {
  //   if (query == "") {
  //     setPage(0);
  //   }
  // }, [query]);

  //this useEffect listens for scrollEvent
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // console.log(`inner height ${window.innerHeight}`);
      // console.log(`scroll Y ${window.scrollY}`);
      // console.log(`body height  ${document.body.scrollHeight}`);
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  //on submitting a new query, we reset all the images, by setting the page state to one.
  // the useEffect above, will automatically fetch images when the page state changes
  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
  };
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
          <button className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <h2 className='loading'>Loading... </h2>}
      </section>
    </main>
  );
}

export default App;

//MFCgEaUu3In9qMhaDTZyik3liI01FxAtDd6EhgVADSU;
