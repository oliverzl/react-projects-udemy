import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

//all our requests will start with this: https://api.unsplash.com/

// in order to get data, we need to provide our own API key:
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

//my access key = MFCgEaUu3In9qMhaDTZyik3liI01FxAtDd6EhgVADSU

//here, we set two variables for the normal data request, and when we input a search term.

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState("");

	const fetchImages = async () => {
		setLoading(true);
		let url;
		const urlPage = `&page=${page}`;
		const urlQuery = `&query=${query}`;

		if (query) {
			url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
		} else {
			url = `${mainUrl}${clientID}${urlPage}`;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();
			setPhotos((oldPhotos) => {
				if (query && page === 1) {
					return data.results;
				} else if (query) {
					return [...oldPhotos, ...data.results];
				} else {
					return [...oldPhotos, ...data];
				}
			});

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	//run the fetchImages function on Mount, and fetchImages when the page state changes
	useEffect(() => {
		fetchImages();
		// eslint-disable-next-line
	}, [page]);

	//the second useEffect is listening for scroll event
	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				!loading &&
				window.innerHeight + window.scrollY >= document.body.scrollHeight - 3
			) {
				setPage((oldPageNumber) => {
					return oldPageNumber + 1;
				});
			}
		});
		return () => window.removeEventListener("scroll", event);
		// eslint-disable-next-line
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setPage(1);
	};
	return (
		<main>
			<section className="search">
				<form
					action=""
					type="text"
					placeholder="search"
					className="search-form"
				>
					<input
						type="text"
						className="form-input"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setPage(0);
						}}
					/>
					<button className="submit-btn" onClick={handleSubmit}>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className="photos">
				<div className="photos-center">
					{photos.map((image, index) => {
						return <Photo key={index} {...image} />;
					})}
				</div>
				{loading && <h2 className="loading">Loading...</h2>}
			</section>
		</main>
	);
}

export default App;
