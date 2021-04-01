//different components in App take in different state values in context. depending on what they need or do not need.
//for example, the Sidebar component only needs the closeSidebar function, which is passed through useContext, and the isSidebarOpen state.
//second example: the Submenu component needs the isSubmenuOpen state value, the location state value(for the location of the submenu appearance), and the page state value

import React, { useState, useContext } from "react";
import App from "./App";
import sublinks from "./data";

const AppContext = React.createContext();

//component AppProvider, we wrap children, which is <App /> inside AppContext.Provider
export const AppProvider = ({ children }) => {
  //sidebar and submenu open or not states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  //this location is to determine how the submenu will open on the navbar
  const [location, setLocation] = useState({});
  //the page state is first set to the object, which is then changed in the openSubmenu function sublinks.find returns one OBJECT, with the page name being products, developer, or company, and the links array associated with that object.
  const [page, setPage] = useState({ page: "", links: [] });

  //opening and closing functions for sidebar and submenu
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text);
    setPage(page);
    setLocation(coordinates);
    //after determining the text and the coordinates of the submenu, we THEN open the submenu.
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    //put in all the state values and functions that we want to useContext with
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        location,
        page,
      }}
    >
      {/* the children here is <App />, this is shown in index.js */}
      {children}
    </AppContext.Provider>
  );
};

//function so we dont need to type useContext(AppContext) multiple times in other components.
export const useGlobalContext = () => {
  return useContext(AppContext);
};

// const AppContext = React.createContext();

// const AppProvider = () => {

//   //declare all the state values to use context with.
//   return (
//     <AppContext.Provider value = {{...}}>
//       <App />
//     </AppContext.Provider>
//   );
// };
