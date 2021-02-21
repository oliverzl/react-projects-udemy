import React, { useState, useContext } from "react";

const AppContext = React.createContext();
//provider, consumer

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //now we set up 4 functions: two to open and close the sidebar, and two to open and close the modal
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        openSidebar,
        openModal,
        closeSidebar,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
