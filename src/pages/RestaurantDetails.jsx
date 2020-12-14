import React, { Component, Fragment } from "react";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantContext } from "../context/RestaurantsContext";

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: {},
      restaurantId: this.props.match.params.restaurantId,
      error: "",
      reviews: [],
      reviewError: "",
    };
  }

  static contextType = RestaurantContext;

  async componentDidMount() {
    const { getSingleRestaurant, getReviews } = this.context;
    const restaurant = await getSingleRestaurant(this.state.restaurantId);
    const reviews = await getReviews(this.state.restaurantId);

    if (reviews.error) {
      this.setState({ reviewError: reviews.error });
    }

    if (restaurant.error) {
      this.setState({ error: restaurant.error });
    } else {
      this.setState({ restaurant, reviews });
    }
  }

  render() {
    const { restaurant, error, reviewError, reviews } = this.state;

    if (error) return <div>{error}</div>;
    return (
      <div>
        <h1 className="text-center display-4">{restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={restaurant.average_rating} />{" "}
          <span className="text-warning ml-1">
            ({restaurant.rating_count === null ? 0 : restaurant.rating_count}{" "}
            reviews )
          </span>
        </div>
        {restaurant && (
          <Fragment>
            <div className="div mt-3">
              {/* {reviewError ? (
                <div className="bg-danger text-white text-center p-2">
                  {reviewError}
                </div>
              ) : (
                <Reviews reviews={reviews} />
              )} */}
              {!reviewError && <Reviews reviews={reviews} />}

              <AddReview />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default RestaurantDetails;
