import Link from "next/link";
import propertyDetailStyles from "./propertyDetails.module.css";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { use, useEffect, useState } from "react";
import Reviews from "../Reviews/reviews";
import { ReactSession } from "react-client-session";

const PropertyDetails = (listingId) => {
  const [data, setData] = useState([]);
  ////
  const [isFavorite, setIsFavorite] = useState(false);
  /////
  const uid = ReactSession.get("uid");

  useEffect(() => {
    //Fetch single listing from flask server and store into state 'data'.
    console.log(listingId);
    fetch("http://127.0.0.1:5000/get_listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: listingId["listingId"] }),
    }).then((response) =>
      response.json().then((data) => {
        setData(data);
        console.log(data);
      })
    );
  }, []);

  //test function to add review
  const add_review = async (e) => {
    const response = await fetch("http://127.0.0.1:5000/add_review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ListingId: listingId["listingId"],
        text: "Loud road, but appartment was very clean.",
        uid: uid,
        rating: 3,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  // Function to fav a listing
  const fav_listing = async (e) => {
    const response = await fetch("http://127.0.0.1:5000/add_favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId: listingId["listingId"], uid: uid }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  // ///////////
  // const addFavoriteListing = async () => {
  //   try {
  //     await fetch("http://127.0.0.1:5000/add_favorite", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ listingId: listingId["listingId"], uid: uid }),
  //     });
  //     setIsFavorite(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleHeartClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      // addFavoriteListing();
      fav_listing();
    } else {
      // Remove listing from favorites
    }
  };

  ///////

  return (
    <div className={propertyDetailStyles.details}>
      <div
        className={propertyDetailStyles.column}
        id={propertyDetailStyles.left}
      >
        <div className={propertyDetailStyles.backToSearchResults}>
          <a
            className={propertyDetailStyles.searchPage}
            id={propertyDetailStyles.arrow}
            href={"./searchScreen"}
          >
            <BiArrowBack />
          </a>
          <Link
            href={"./searchScreen"}
            className={propertyDetailStyles.searchPage}
            id={propertyDetailStyles.search}
          >
            Back to search results
          </Link>
        </div>
        <div className={propertyDetailStyles.listingBody}>
          <div className={propertyDetailStyles.listingLeft}>
            <img
              id={propertyDetailStyles.main_image}
              src={data.image}
              alt={data.Address}
            ></img>
            <div className={propertyDetailStyles.listingInfo}>
              <div className={propertyDetailStyles.listingInfoLeft}>
                <p id={propertyDetailStyles.info_1}>{data.Address}</p>
                <p id={propertyDetailStyles.info_2}>
                  Number of bedrooms : {data.numBedroom} <br></br>
                  Number of bathrooms : {data.numBathroom} <br></br>
                </p>
                <p id={propertyDetailStyles.info_3}>£{data.Price} pcm</p>
                <p id={propertyDetailStyles.info_4}>Letting Details</p>
                <p id={propertyDetailStyles.info_5}>
                  Let available date: {data.availableDate}
                </p>
                <p id={propertyDetailStyles.info_6}>Let type: {data.letType}</p>
                <p id={propertyDetailStyles.info_7}>
                  Furnish type: {data.furnishType}
                </p>
              </div>

              <div className={propertyDetailStyles.listingInfoRight}>
                <a
                  id={propertyDetailStyles.heart}
                  href="#"
                  onClick={handleHeartClick}
                >
                  <AiOutlineHeart
                    style={{ color: isFavorite ? "red" : "gray" }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={propertyDetailStyles.listingRight}>
            <p className={propertyDetailStyles.review}>Reviews</p>
            <Reviews listingId={listingId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertyDetails };
