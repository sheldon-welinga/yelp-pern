import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";

class EditRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      price_range: "Price Range",
      restaurantId: "",
    };
  }

  static contextType = RestaurantContext;

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  async componentDidMount() {
    const { restaurantId } = this.props.match.params;
    const { getSingleRestaurant } = this.context;

    const restaurant = await getSingleRestaurant(restaurantId);

    if (restaurant.error) {
      //   console.log(restaurant.error);
      this.props.history.push("/");
    } else {
      this.setState({
        name: restaurant.name,
        location: restaurant.location,
        price_range: restaurant.price_range,
        restaurantId: restaurant.restaurant_id,
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { updateRestaurant } = this.context;

    const response = await updateRestaurant(this.state);

    if (response.message) {
      this.props.history.push("/");
      console.log(response);
    } else {
      console.log(response);
    }
  };

  render() {
    const { name, location, price_range } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price_range">Price Range</label>

            <select
              name="price_range"
              id="price_range"
              className="custom-select "
              value={price_range}
              onChange={this.handleChange}
            >
              <option disabled>Price Range</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button className="btn btn-warning">Update</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditRestaurant);
