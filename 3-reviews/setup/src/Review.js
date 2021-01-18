import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const checkNumber = (number) => {
    //creates a loop/circle of displaying the next and previous person

    //this if block returns the first user if user decides to click next person on the last item in the array.
    if (number > people.length - 1) {
      return 0;
    }

    //this if block is to return the last item in the array if user decides to go to the previous review, at index 0.
    if (number < 0) {
      return people.length - 1;
    }

    return number;
  };

  //function nextPerson and prevPerson both take in an argument in the useState set function, to pass in the CURRENT VALUE OF STATE
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;

      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  const randomPerson = () => {
    //variable randomNumber makes a random number between 0 and 3 for the random index
    let randomNumber = Math.floor(Math.random() * people.length);

    //the if block below is to make sure that the random number generated above does not repeat itself, and will always be a different number, with the function checkNumber to make sure that the when we add 1 to the randomNumber generated, it does not exceed 4 as well, as that will cause an error
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
    console.log(randomNumber);
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>

      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>

      {/* random review generator button below */}
      <button className="random-btn" onClick={randomPerson}>
        Surprise Me
      </button>
    </article>
  );
};

export default Review;
