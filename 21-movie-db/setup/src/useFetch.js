import React, { useState, useEffect } from "react";

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = (urlParams) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState({ show: false, msg: "" });
	const [data, setData] = useState(null);

	const fetchMovies = async (url) => {
		setIsLoading(true);
		try {
			const response = await fetch(url);
			const data = await response.json();
			if (data.Response === "True") {
				//we either setData to data.Search, this is for the Search, however, if it is only one SingleMovie, we will only need data.
				console.log(data);
				setData(data.Search || data);
				setError({ show: false, msg: "" });
			} else {
				setError({ show: true, msg: data.Error });
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	//will always run when  query state changes
	useEffect(() => {
		fetchMovies(`${API_ENDPOINT}${urlParams}`);
	}, [urlParams]);

	return { isLoading, error, data };
};

export default useFetch;
//this is the useFetch refactoring

//over here, we have a useEffect that will fetch ALL movies. however, we want the useFetch hook dynamically. for now, we have two URLs, one for search and one for the ID. but we want the useFetch custom hook to be used in both places.

//if there is a search, we pass in the property value which is the array, but if we are looking for a single movie, we know that search wont be on the object, because we get that one object only.
