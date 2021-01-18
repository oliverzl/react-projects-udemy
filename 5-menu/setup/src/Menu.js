import React from "react";

const Menu = ({ propMenuItems }) => {
  return (
    <div className="section-center">
      {/* here we map over the matching items of the category, and display them below the buttons */}
      {propMenuItems.map((menuItem) => {
        const { id, title, img, desc, price } = menuItem;
        return (
          <article className="menu-item" key={id}>
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
