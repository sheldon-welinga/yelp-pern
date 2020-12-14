import React, { createContext, Component } from "react";
import { API_URL } from "../api/config";

const RestaurantContext = createContext();

class RestaurantProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      // reviews: [],
      // restaurant: {},
    };
  }

  //fetch all restaurants from the database
  getRestaurants = async () => {
    try {
      const configOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`${API_URL}/restaurants/`, configOptions);

      const data = await response.json();

      this.setState({ restaurants: data });
    } catch (err) {
      console.log(err);
    }
  };

  //get a single restaurant
  getSingleRestaurant = async (restaurantId) => {
    try {
      const configOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/restaurants/${restaurantId}`,
        configOptions
      );

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  //add a new restaurant to the database
  addRestaurant = async (restaurantDetails) => {
    try {
      const configOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantDetails),
      };

      const response = await fetch(`${API_URL}/restaurants/new`, configOptions);

      const data = await response.json();

      this.setState((prevState) => {
        return { restaurants: [...prevState.restaurants, data.data] };
      });

      return data;
    } catch (err) {
      return { error: err.message };
    }
  };

  //update restaurant details
  updateRestaurant = async (restaurant) => {
    try {
      const configOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      };

      const response = await fetch(
        `${API_URL}/restaurants/edit/${restaurant.restaurantId}`,
        configOptions
      );

      const data = await response.json();

      let restaurants = this.state.restaurants.filter(
        (restaurant) => restaurant.restaurant_id !== data.data.restaurant_id
      );

      this.setState({
        restaurants: [...restaurants, data.data],
      });

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  //delete a restaurant from the database
  deleteRestaurant = async (restaurantId) => {
    try {
      const configOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/restaurants/delete/${restaurantId}`,
        configOptions
      );

      const data = await response.json();

      if (data.message) {
        const restaurants = this.state.restaurants.filter(
          (restaurant) => restaurant.restaurant_id !== restaurantId
        );

        this.setState({
          restaurants,
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //get all reviews for a given restaurant
  getReviews = async (restaurantId) => {
    try {
      const configOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/reviews/${restaurantId}`,
        configOptions
      );

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  //create a new review

  addReview = async (review) => {
    try {
      const configDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      };

      const response = await fetch(`${API_URL}/reviews/new`, configDetails);

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  componentDidMount() {
    this.getRestaurants();
  }
  render() {
    return (
      <RestaurantContext.Provider
        value={{
          ...this.state,
          getRestaurants: this.getRestaurants,
          addRestaurant: this.addRestaurant,
          deleteRestaurant: this.deleteRestaurant,
          getSingleRestaurant: this.getSingleRestaurant,
          updateRestaurant: this.updateRestaurant,
          getReviews: this.getReviews,
          addReview: this.addReview,
        }}
      >
        {this.props.children}
      </RestaurantContext.Provider>
    );
  }
}

export { RestaurantContext, RestaurantProvider };
