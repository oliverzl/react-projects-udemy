import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
	//taking values from useContext
	const { query, setQuery, error } = useGlobalContext();

	return (
		<form
			action=""
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className="search-form"
		>
			<h2>Search Movies</h2>
			<input
				type="text"
				className="form-input"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{error.show && <div className="error">{error.msg}</div>}
		</form>
	);
};

export default SearchForm;
