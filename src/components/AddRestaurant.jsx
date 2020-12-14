import React from "react";
import { RestaurantContext } from "../context/RestaurantsContext";

class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      price_range: "Price Range",
    };
  }

  static contextType = RestaurantContext;

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { addRestaurant } = this.context;

    if (this.state.price_range !== "Price Range") {
      addRestaurant(this.state);
    }

    this.setState({
      name: "",
      location: "",
      price_range: "Price Range",
    });
  };

  render() {
    const { name, location, price_range } = this.state;

    return (
      <div className="mb-4">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                autoComplete="off"
                id="name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                autoComplete="off"
                id="location"
                name="location"
                value={location}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <select
                name="price_range"
                id="price_range"
                className="custom-select "
                value={price_range}
                onChange={this.handleChange}
              >
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddRestaurant;
