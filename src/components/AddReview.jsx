import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      review: "",
      rating: "Rating",
      restaurantId: "",
    };
  }

  static contextType = RestaurantContext;

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { addReview } = this.context;

    const review = await addReview(this.state);

    console.log(review.message);

    if (review.message) {
      window.location.reload();
    }

    this.setState({
      name: "",
      review: "",
      rating: "Rating",
    });
  };

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    this.setState({ restaurantId });
  }

  render() {
    const { name, review, rating } = this.state;

    return (
      <div className="mb-2">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-8">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                required
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="rating">Rating</label>
              <select
                name="rating"
                id="rating"
                required
                className="custom-select"
                value={rating}
                onChange={this.handleChange}
              >
                <option value="Rating" disabled>
                  Rating
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review">Review</label>
            <textarea
              name="review"
              id="review"
              placeholder="Type in your review comment here..."
              className="form-control"
              required
              value={review}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddReview);
