//all the buttons are in this file. the functionality is to only display the matching foods when specific buttons are pressed, we display the items that match the category of button pressed

//the problem with non-dynamic approach is, we arent in sync with our data. if we keep adding more items, and if those items have more categories, we have to manually add in more buttons, and that isnt a good practice

import React from "react";

const Categories = ({ categories, filterItems }) => {
  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <button
            className="filter-btn"
            type="button"
            key={index}
            onClick={() => {
              filterItems(category);
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
