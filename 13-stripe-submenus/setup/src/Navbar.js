import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Navbar = () => {
  //we immediately destructure the functions and possible state values from useGlobalContext. remember, useGlobalContext function call returns useContext(AppContext);
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();
  const displaySubmenu = (event) => {
    const page = event.target.textContent;
    const tempBtn = event.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    openSubmenu(page, { center, bottom });
  };

  //we cannot implement closing the submenu on navbar mouseOver, because the links itself that triggers the display of submenus resides directly in navbar. if we implement the same thing as in the hero component, submenu will not even be displayed.
  const handleSubmenu = (event) => {
    if (!event.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };
  return (
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='nav-header'>
          <img className='nav-logo' src={logo} alt='stripe' />
          <button className='btn toggle-btn' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              products
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              developers
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              company
            </button>
          </li>
        </ul>
        <button className='btn signin-btn'>Sign In </button>
      </div>
    </nav>
  );
};

export default Navbar;
