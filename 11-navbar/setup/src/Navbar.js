//this project is a simple navbar, and making use of map to automatically change any values that may be in multiple places and components, with data.js
//to make the menu show with the transition, we cannot use the useState method of conditionally showing the component, because we essentially mount and unmount the component.
//instead of conditionally displaying the whole div with showLinks && ....

//we conditionally change the className we want the div to have.

//the next issue is that we hard code the height for the links in the drop down menu. we use a fix that automatically adjusts the height of the container so that with every addition or subtraction of li in the navbar.
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";

import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  //this is the useEffect that makes the dynamic height of the links work, depending on the amount of links. in css, the media query for links-container has !important1
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
    console.log(linksHeight);
  }, [showLinks]);
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt='logo' />
          <button
            className='nav-toggle'
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        {/* this is the ternary operator to show different classNames depending of the state of showLinks */}
        <div className={"links-container"} ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {/* these are the links, and we use links.map to map out all the link template inside data.js */}
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
