import React from "react";
import { useGlobalContext } from "./context";

//set to disable button when fetching
const Buttons = () => {
	const { isLoading, page, nbPages, handlePage } = useGlobalContext();

	return (
		<div className="btn-container">
			<button disabled={isLoading} onClick={() => handlePage("dec")}>
				Prev
			</button>
			<p>
				{page + 1} of {nbPages}
			</p>

			<button disabled={isLoading} onClick={() => handlePage("inc")}>
				next
			</button>
		</div>
	);
};

export default Buttons;
