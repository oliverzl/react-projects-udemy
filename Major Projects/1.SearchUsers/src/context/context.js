import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);

	const [requests, setRequests] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	//errors
	const [error, setError] = useState({ show: false, msg: "" });

	const searchGithubUser = async (user) => {
		//if there is an error, remove it with the next request
		//invoking without arguments because there are already default values in the toggleError function declaration.
		toggleError();
		setIsLoading(true);
		const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
			console.log(err)
		);

		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;

			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					//results will be an array, and in the objects, we look for the status. if it is fulfilled, get the data.
					const [repos, followers] = results;
					const status = "fulfilled";
					if (repos.status === "fulfilled") {
						setRepos(repos.value.data);
					}
					if (followers.status === "fulfilled") {
						setFollowers(followers.value.data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			toggleError(true, "there is no user with that username");
		}
		checkRequests();
		setIsLoading(false);
	};

	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;

				setRequests(remaining);
				if (remaining === 0) {
					toggleError(
						true,
						"Sorry, you have exceeded your hourly request limit!"
					);
				}
			})
			.catch((err) => console.log(err));
	};

	function toggleError(show = false, msg = "") {
		setError({ show, msg });
	}
	//error
	useEffect(checkRequests, []);
	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchGithubUser,
				isLoading,

				// setGithubUser,
				// setRepos,
				// setFollowers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubProvider, GithubContext };
