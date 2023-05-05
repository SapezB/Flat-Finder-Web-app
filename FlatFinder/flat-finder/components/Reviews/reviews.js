import propertyDetailStyles from "../propertyDetails/propertyDetails.module.css";
import { useState, useEffect } from "react";

export default function reviews(listingId) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const id = listingId["listingId"];
    const response = fetch("http://127.0.0.1:5000/get_reviews", {
      //This part is used to get reviews for the listing
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((revresponse) =>
      revresponse.json().then((reviews) => {
        setReviews(reviews);
        console.log(reviews);
      })
    );
  }, []);
  return (
    <div>
      {typeof reviews === "undefined" ? (
        <p>Loading...</p>
      ) : (
        reviews.map((review, i) => (
          <div
            key={i}
            className={propertyDetailStyles.reviewBox}
            id={propertyDetailStyles.box1}
          >
            <div className={propertyDetailStyles.reviewName}>
              <h3>{review.name}</h3>
            </div>
            <div className={propertyDetailStyles.reviewRating}>
              <h4>Rating: {review.rating}/5</h4>
            </div>
            <div className={propertyDetailStyles.reviewText}>
              <p>{review.text}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
