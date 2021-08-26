import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
	const { isLoading } = useContext(GithubContext);

	//two returns, when loading and not loading

	if (isLoading) {
		return (
			<main>
				<Navbar />
				<Search />
				<img src={loadingImage} alt="loading" className="loading-img" />
			</main>
		);
	}
	return (
		<main>
			<Navbar></Navbar>
			<Search />
			<Info />
			<User />
			<Repos />
		</main>
	);
};

export default Dashboard;
