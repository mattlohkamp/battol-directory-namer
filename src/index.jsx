import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you import from 'react-dom/client'
import App from "./App";
import store from "./state/store.js";
import { Provider } from "react-redux";

//	TODO: strict mode intentionally invokes useEffect twice remember

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
