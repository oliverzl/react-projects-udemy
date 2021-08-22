import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev--wkmxx-3.us.auth0.com
//MMnrSbMxPhI2QW2vcScMhYYePB5ux8Wa

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev--wkmxx-3.us.auth0.com"
			clientId="MMnrSbMxPhI2QW2vcScMhYYePB5ux8Wa"
			redirectUri={window.location.origin}
		>
			<GithubProvider>
				<App />
			</GithubProvider>
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
