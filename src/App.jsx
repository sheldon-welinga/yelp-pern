import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import SingleRestaurant from "./pages/SingleRestaurant";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/restaurants/:restaurantId/edit"
            component={SingleRestaurant}
          />
          <Route
            exact
            path="/restaurants/:restaurantId"
            component={RestaurantDetails}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
