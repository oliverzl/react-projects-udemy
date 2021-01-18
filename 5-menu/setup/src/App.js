import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

//adding functionality where we only get the unique categories from the items list, but it will give us back repeating values, and this is where the Set data structure comes into play.

//now, we set allCategories as an array, with 'all' being the first, and then using the spread operator, add in the Set that removes any repeat of categories in the items array, resulting in only 4 categories in this project: all, breakfast, lunch, and shakes.
const allCategories = [
  "all",
  ...new Set(
    items.map((item) => {
      return item.category;
    })
  ),
];

console.log(allCategories);

function App() {
  //sets a default state value for all the items imported from './data'
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  //this filterItems function CANNOT be declared inside Categories.js, as it needs the whole list of items inside './data', and it is only imported HERE, into App.js
  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }

    //if the above if block is not true, run the code below
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu-section">
        <div className="title">
          <h2>Our Menu</h2>
          <div className="underline"></div>
        </div>
        {/* prop categories = {state value categories} */}
        <Categories filterItems={filterItems} categories={categories} />
        {/* propMenuItems is what gets passed in, and is the one getting destructured, and map is called with it in Menu.js */}
        <Menu propMenuItems={menuItems} />
      </section>
    </main>
  );
}

export default App;
