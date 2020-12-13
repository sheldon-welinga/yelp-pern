import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";

const RestaurantList = (props) => {
  const { restaurants, deleteRestaurant } = useContext(RestaurantContext);

  // console.log(restaurants);

  const handleEdit = (restaurantId) => {
    props.history.push(`/restaurants/${restaurantId}/edit`);
  };

  const handleDelete = (restaurantId) => {
    deleteRestaurant(restaurantId);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length
            ? restaurants.map(
                ({ name, location, price_range, restaurant_id }) => {
                  return (
                    <tr key={restaurant_id}>
                      <td>{name}</td>
                      <td>{location}</td>
                      <td>{"$".repeat(price_range)}</td>
                      <td>rating</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(restaurant_id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(restaurant_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(RestaurantList);
