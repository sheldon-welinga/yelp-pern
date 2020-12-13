import React from "react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";
// import Header from "../components/Header";

const Home = () => {
  return (
    <div className="home">
      <h2 className="font-weight-light display-3 text-center">
        Restaurant Finder
      </h2>
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
