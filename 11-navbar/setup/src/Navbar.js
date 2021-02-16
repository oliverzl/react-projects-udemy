import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  //this ref is for the div
  const linksContainerRef = useRef(null);
  //this ref is for the ul
  const linksRef = useRef(null);

  //this useEffect will only trigger when showLinks is toggled.
  useEffect(() => {
    //we manually check the height of the links to update the link container, saving us styling time with arbirtrary number of links to style a navbar height.
    //the height is 1.5rem plus 1rem top bottom padding x the amount of links.
    //40px : one link, 5 links 200px.
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksHeight);
    if (showLinks) {
      //we need linksContaierRef to be able to set it to the linksHeight depending on the amount of links there are.
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt='logo' />
          <button
            className='nav-toggle'
            onClick={() => {
              //onClick, setShowLinks to the opposite of the current showLinks, making a toggle
              setShowLinks(!showLinks);
            }}
          >
            <FaBars />
          </button>
        </div>

        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
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
              <li href={url} key={id}>
                {icon}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
