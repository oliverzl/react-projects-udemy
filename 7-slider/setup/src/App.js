//this app creates a carousel slider, with the added functionality that it will slide after a predetermined time without the user touching any buttons

import React, {useState, useEffect} from "react";
import {FiChevronRight, FiChevronLeft} from "react-icons/fi";
import {FaQuoteRight} from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  // ==================================================================================START OF USEEFFECT======================================================
  //below, we have 2 useEffects
  useEffect(() => {
    //lastIndex is people.length - 1 because indexes start with 0. people.length is 4, which means the lastIndex is 3.
    const lastIndex = people.length - 1;
    //restarting from the lastIndex, because we cannot have a negative value for index.
    if (index < 0) {
      setIndex(lastIndex);
    }
    //setting the index to 0 because we cannot have an index bigger than the lastIndex.
    if (index > lastIndex) {
      setIndex(0);
    }
    //useEffect that only runs if index, or people changes. the second argument is the dependency array.
  }, [index, people]);

  useEffect(() => {
    //slider is a function that automatically slides the carousel if no action is taken.
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    //we can return a function inside useEffect, this serves as a cleanup function.
    return () => {
      clearInterval(slider);
    };
    //again, this only runs when slider re-renders
  }, [index]);
  // ==================================================================================END OF USEEFFECT======================================================

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <section className='section-center'>
        {people.map((person, personIndex) => {
          const {id, image, name, title, quote} = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className='person-img' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>

        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </section>
    </section>
  );
}

export default App;
