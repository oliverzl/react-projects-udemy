//in this birthday mini project, we set up useState functionality and our default state with the data array that we import in.
//we return a <List/>, which maps a people array that lists out all the people who have birthdays in the data array
//we also include a method to clear the whole list of people.

//simple useState project

import React, { useState } from "react";
import data from "./data";
import List from "./List";

function App() {
  const [people, setPeople] = useState(data);
  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <List people={people} />
        <button onClick={() => setPeople([])}>Clear All</button>
      </section>
    </main>
  );
}

export default App;
