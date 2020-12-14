import React, { Fragment, useContext } from "react";
import { withRouter } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, deleteRestaurant } = useContext(RestaurantContext);

  // console.log(restaurants);

  const handleEdit = (e, restaurantId) => {
    e.stopPropagation();
    props.history.push(`/restaurants/${restaurantId}/edit`);
  };

  const handleDelete = (e, restaurantId) => {
    e.stopPropagation();
    deleteRestaurant(restaurantId);
  };

  const handleRestaurantSelect = (restaurantId) => {
    props.history.push(`/restaurants/${restaurantId}`);
  };

  const renderRating = (reviews, count) => {
    let rating_count = 0;
    count === null ? (rating_count = 0) : (rating_count = count);
    return (
      <Fragment>
        <StarRating rating={reviews} />{" "}
        <span className="text-warning ml-1">({rating_count} reviews)</span>
      </Fragment>
    );
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
                ({
                  restaurant_id,
                  name,
                  location,
                  price_range,
                  rating_count,
                  average_rating,
                }) => {
                  return (
                    <tr
                      key={restaurant_id}
                      onClick={() => handleRestaurantSelect(restaurant_id)}
                    >
                      <td>{name}</td>
                      <td>{location}</td>
                      <td>{"$".repeat(price_range)}</td>
                      <td>{renderRating(average_rating, rating_count)}</td>
                      {/* <td>rating</td> */}
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={(e) => handleEdit(e, restaurant_id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDelete(e, restaurant_id)}
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
