import React, { Fragment } from "react";

const StarRating = ({ rating }) => {
  let stars = [];

  // let rating = (rating/5)

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars = [...stars, <i className="fas fa-star text-warning" key={i}></i>];
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars = [
        ...stars,
        <i className="fas fa-star-half-alt text-warning" key={i}></i>,
      ];
    } else {
      stars = [...stars, <i className="far fa-star text-warning" key={i}></i>];
    }
  }

  return <Fragment>{stars}</Fragment>;
};

export default StarRating;
