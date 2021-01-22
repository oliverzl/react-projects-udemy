//we pass in rgb as props to this component, to use CSS to set the background color of the tint/shade/base to the rgb.

import React, { useState, useEffect } from "react";
import rgbToHex from "./utils"; //this is a function that converts rgb to hex values

//so, we have two ways to access the hex values, one is passing in rgb to the rgbToHex function imported from utils.js, and the other is to access it directly from the color object property.

//in the destructuring, rgb and weight both come from the color object, and the index is the prop that we pass in

//hexColor is destructured from the color item from the library
const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(","); //this takes the array of 3 values and turns them into a string, into valid rgb values that can be used by CSS

  //the hex below is taking the rgb value and passing it to the function imported from utils.js
  const hex = rgbToHex(...rgb);

  //hexColor from the object itself does not include the hash(#), thats why we declare a new variable adding the hash
  const hexValue = `#${hexColor}`;

  //this if else is just to add in the negative symbol
  if (index > 10) {
    weight = "-" + weight + "%";
  } else weight = weight + "%";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      //we set two classes, one is color, and one is conditional to change the text if the background is too dark.
      className={`color ${index > 10 && "color-light"}`}
      //the inline style with the backgroundColor and rgb${} makes sure that each panel has a background color.
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className='percent-value'>{weight}</p>
      <p className='color-value'>{hexValue}</p>
      {alert && <p className='alert'>Copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
