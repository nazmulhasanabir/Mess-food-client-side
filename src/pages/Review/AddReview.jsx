import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import UseAxiosPublic from "../axios/UseAxiosPublic";
import Swal from "sweetalert2";
const AddReview = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const { id } = useParams();
  const [card, setCard] = useState([])
  const location = useLocation()
  const name = user.displayName
  const mail  = user.email
  const mealName = card.meal_name
  const [rating, setRating] = useState(0);
  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    if (value > 5) value = 5;
    setRating(value);
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  axiosPublic.get(`meals/${id}`)
  .then((res)=> {
    setCard(res.data)
  })
  const onSubmit = (data) => {
    axiosPublic.post("/review", { data, id, name,mail,mealName }).then((res) => {
            Swal.fire({
              // position: "top-center",
              icon: "success",
              title: " Review Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
        navigate(`/meals/${id}`)
    });
  };
  return (
    <div>
      <div>
        <div className="w-11/12 lg:w-6/12 mx-auto">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt=""
            />
            <h2>{user?.displayName}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              {/* text review */}
              <textarea
                name="textReview"
                {...register("textReview", { required: true })}
                required
                className="textarea textarea-bordered w-full"
                placeholder="Text Your FeedBack"
              ></textarea>
            </div>

            <div className="form-control">
              {/* rating section */}
              <label className="input input-bordered flex items-center gap-2">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  value={rating}
                  size={20}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                (Clicked The Star )
                <input
                  type="0"
                  required
                  {...register("starReview", { required: true })}
                  name="starReview"
                  className="grow"
                  placeholder="Rating star"
                  min="0"
                  value={rating}
                  max="5"
                  step="1"
                  onChange={handleInputChange}
                />
              </label>

              {/* user info  */}
              <label className=" input input-bordered flex items-center gap-2">
                User Name:
                <input
                  name="Username"
                  {...register("Username", { required: true })}
                  type="text"
                  value={user?.displayName}
                  className="grow"
                  placeholder="User Info"
                />
              </label>
            </div>
            <div className="w-2/12 mx-auto">
              <input className="btn btn-primary" type="submit" value="Review" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
