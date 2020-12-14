import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews &&
        reviews.map(({ review_id, review, name, rating }) => {
          return (
            <div
              className="card text-white bg-primary mb-3 mr-4"
              style={{ width: "100%", maxWidth: "30%" }}
              key={review_id}
            >
              <div className="card-header d-flex justify-content-between">
                <span>{name}</span>
                <span>
                  <StarRating rating={rating} />
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{review}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Reviews;
