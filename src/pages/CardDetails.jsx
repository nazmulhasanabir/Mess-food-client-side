import { BiSolidLike } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import UseAxiosPublic from "./axios/UseAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";

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

  const axiosPublic = UseAxiosPublic();
  const handleLike = (name, id) => {
    axiosPublic
      .post("/like", { meal_name: name, meal_id: id })
      .then((res) => {});
  };
  axiosPublic.get(`http://localhost:5000/like?id=${_id}`).then((res) => {
    setLike(res.data);
  });

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
            <button className="btn btn-primary">Add Review</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
