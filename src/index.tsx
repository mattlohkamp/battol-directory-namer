import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you import from 'react-dom/client'
import App from "./App";
import store from "./state/store";
import { Provider } from "react-redux";
import "simpledotcss";
import "./custom.simple.css";

//	TODO: strict mode intentionally invokes useEffect twice remember
const rootElement = document.getElementById("root");
if (rootElement === null) {
	throw new Error("ReactDOM error: Root element selector returned null");
}
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
