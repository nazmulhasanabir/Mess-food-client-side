import { BiSolidLike } from "react-icons/bi";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import UseAxiosPublic from "./axios/UseAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import RatingCustome from "./RatingCustome";
import Swal from "sweetalert2";

const CardDetails = () => {
  const CardDetails = useLoaderData();
  const {
    title,
    _id,
    category,
    image,
    distributor_name,
    description,
    ingredients,
    post_time,
    rating,
    price,
    reviews,
  } = CardDetails;
console.log(CardDetails);
  const [like, setLike] = useState([]);
  const [reviewes, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const { badge } = user;
  const [isSubscribed, setIsSubscribed] = useState(false); // Flag to check if user is subscribed
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch like count and reviews for this meal
    axiosPublic.get(`http://localhost:5000/like?id=${_id}`).then((res) => {
      setLike(res.data);
    });

    axiosPublic.get(`http://localhost:5000/review?id=${_id}`).then((res) => {
      setReviews(res.data);
    });
  }, [_id, user?.badge]);

  const handleMealRequest = (name, like, review, email, id) => {
    const mealRequest = {
      email: email,
      name: name,
      like: like,
      review: review,
      status: "pending",
      id: id,
    };

    axiosPublic
      .post("http://localhost:5000/mealRequest", mealRequest)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          Swal.fire(
            "Success",
            "Meal request submitted successfully!",
            "success"
          );
        }
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to submit meal request.", "error");
        console.error("Error requesting meal:", error);
      });
  };

  const handleLike = (name, id) => {
    axiosPublic.post("/like", { title: name, meal_id: id }).then(() => {
      axiosPublic.get(`http://localhost:5000/like?id=${id}`).then((res) => {
        setLike(res.data);
      });
    });
  };

  const subscription = () => {
    return badge !== "Bronze";
  };

  return (
    <>
      {CardDetails ? (
        <div>
          <div className="hero bg-base-200 min-h-screen">
            <div>
              <img
                src={image}
                className="max-w-3xl rounded-lg shadow-2xl"
                alt="Meal"
              />
              <div>
                <h1 className="text-5xl font-bold">{title}</h1>
                <p className="py-6">{description}</p>
                <div>
                  {reviews > 0 ? (
                    reviews.map((rev, index) => (
                      <div key={index}>
                        <p className="text-3xl font-bold">{rev.user}</p>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>

                <button
                  onClick={() =>
                    handleMealRequest(
                      title,
                      like.length,
                      reviewes.length,
                      user.email,
                      _id
                    )
                  }
                  className={`btn ${
                    subscription() ? "btn-primary" : "btn-disabled"
                  }`}
                  disabled={!subscription()}
                >
                  Request For Meal
                </button>

                <button
                  onClick={() => handleLike(title, _id)}
                  className={`btn ${
                    subscription() ? "btn-primary" : "btn-disabled"
                  }`}
                  disabled={!subscription()}
                >
                  <BiSolidLike />
                  {like.length}
                </button>

                <Link to={`/review/${_id}`}>
                  <button
                    className={`btn ${
                      subscription() ? "btn-primary" : "btn-disabled"
                    }`}
                    disabled={!subscription()}
                  >
                    Add Review
                  </button>
                </Link>

                {/* Show badge info */}
                <div className="mt-4">
                  {subscription ? (
                    <span className=""></span>
                  ) : (
                    <span className="badge badge-warning">No Subscription</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 w-10/12 mx-auto mt-9">
            {reviewes.length > 0 ? (
              reviewes.map((review) => (
                <div
                  key={review._id}
                  className="card bg-blue-400 text-white w-52 shadow-xl"
                >
                  <figure>
                    <img
                      src={review.photoURL}
                      className="rounded-full w-14 h-14"
                      alt="Reviewer"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="text-center font-bold">
                      {review.Username}
                      <div className="bg-purple-400 rounded-lg">
                        <p className="font-semibold">{review.textReview}</p>
                      </div>
                    </h2>
                    <h2 className="flex items-center">
                      Rating <RatingCustome rating={review.starReview} />
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306CCE", "#72A1ED"]}
          />
        </div>
      )}
    </>
  );
};
export default CardDetails;
