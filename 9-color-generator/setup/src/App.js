//in this app, we can input a color, and the app displays the different tints available for that color. if the color hex code is incorrect, or not applicable, the input field border highlights RED.

//we import the library from values.js, which is an API that we can use and manipulate for our personal projects as well.

//for the functionality of Values.js, we use the all() function, which takes in the color, and its tint gradients.

//TWO WAYS TO ACCESS COLORS: through the library, or use the function from utils.js
import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  //we include an error state value for the input field that highlights red when there is an invalid hex value.
  //we also include a default state color right when the app mounts.
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#f15025").all(10));

  //below is the submit function to submit the color hex values.
  //we include in try...catch as if the value is not valid, the whole app crashes, and we dont want that. we want the user to be able to try again to key in another value.
  //we try this block of code, and catch the error that occurs
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      //color is what the user inputs.

      //for color.all, this returns an array of 21 objects, 10 tints, 10 shades and 1 base
      //each object consists of 4 items: RGB(array of 3 numbers), alpha, type, and the weight
      let colors = new Values(color).all(10);
      setList(colors);
    } catch (error) {
      //we catch the error below and set the error state to true if the color input doesnt make sense, like 2 or #3, instead of #f15025
      setError(true);
      console.log(error);
    }
  };
  return (
    <>
      <section className='container'>
        <h3>Color Generator</h3>
        <form onSubmit={handleSubmit}>
          {/* in this input, we are setting up controlled input: as we type something, we are changing the value in the state, and the value of the input will also be equal to the state value */}
          <input
            type='text'
            value={color}
            onChange={(event) => setColor(event.target.value)}
            placeholder='#f15025'
            //since we set the conditional className below, we use template string, to check the boolean of error, depending on true or false, we set it to error or null
            className={`${error ? "error" : null}`}
          />
          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
        <div style={{ width: "80px" }}></div>
        <h5>
          Enter a hex value color into the input to get it's corresponding
          shades and tints, click on any panel to copy the hex value!
        </h5>
      </section>
      {/* the section below is where we display our colors and its tints */}
      <section className='colors'>
        {list.map((color, index) => {
          //we pass in the index: to change the text color at the end of the array (shades) to white, as it becomes more unreadble.

          return (
            //we pass in the whole object color, since in the statement above, we set the list state to the colors array.

            //for the index prop below: hex values and weight text colors is black, easy to read with lighter backgrounds(tint), unreadable with darker backgrounds(shades), we target index no. past 10 to target only shades, and chagne text color to white.
            <SingleColor
              key={index}
              index={index}
              {...color}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
