import React, { useState, useContext } from "react";
// make sure to use https

import useFetch from "./useFetch";

//env needs to be in the root folder

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	//query: the only state value here. the other state values will be in useFetch custom hook
	const [query, setQuery] = useState("batman");
	const { isLoading, error, data: movies } = useFetch(`&s=${query}`);
	return <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
