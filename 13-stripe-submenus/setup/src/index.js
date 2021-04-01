import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//importing both the App component and the AppProvider component, from App.js, and context.js respectively
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    {/* component <App /> is wrapped in <AppProvider /> component */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
