import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RestaurantProvider } from "./context/RestaurantsContext";

ReactDOM.render(
  <RestaurantProvider>
    <App />
  </RestaurantProvider>,
  document.getElementById("root")
);
