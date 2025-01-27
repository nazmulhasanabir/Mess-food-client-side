import { BiSolidLike } from "react-icons/bi";
import { Link, useLoaderData } from "react-router-dom";
import UseAxiosPublic from "./axios/UseAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import RatingCustome from "./RatingCustome";

const CardDetails = () => {

  const CardDetails = useLoaderData();
  const {
    meal_name,
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
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState([]);
  const [reviewes, setReviews] = useState([])
  const axiosPublic = UseAxiosPublic();
  const handleLike = (name, id) => {
    axiosPublic
      .post("/like", { meal_name: name, meal_id: id })
      .then((res) => {});
  };
  axiosPublic.get(`http://localhost:5000/like?id=${_id}`).then((res) => {
    setLike(res.data);
  });
  axiosPublic.get(`http://localhost:5000/review?id=${_id}`).then((res) => {
    setReviews(res.data)
  })
  
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className=" ">
          <img src={image} className="max-w-3xl rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{meal_name}</h1>
            <p className="py-6">{description}</p>
            <div>
              {reviews.map((rev, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold">{rev.user}</p>
                </div>
              ))}
            </div>

            <button className="btn btn-primary">Request For Meal</button>
            <button
              onClick={() => handleLike(meal_name, _id)}
              className={`btn btn-primary `}
            >
              <BiSolidLike></BiSolidLike>
              {like.length}
            </button>
            <Link to={`/review/${_id}`}>
            <button  className="btn btn-primary">Add Review</button>
            </Link>

          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-10/12 mx-auto mt-9">
        {reviewes.map((review) => (
          <div className="card bg-blue-400 text-white w-52 shadow-xl ">
            <figure>
              <img src={review.photoURL} className="rounded-full w-14 h-14" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="text-center font-bold">
                {review.Username}
                <div className="bg-purple-400 rounded-lg">
              <p className="font-semibold">{review.textReview}</p>
                </div>
              </h2>
                  <h2 className="flex items-center">Rating <RatingCustome rating={review.starReview}></RatingCustome></h2>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDetails;
