import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import UseAxiosPublic from "../axios/UseAxiosPublic";
import SocialLogin from "../social/SocialLogin";

const SignUp = () => {
  const { createUser, UpdateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const badge = "Bronze";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const logUser = result.user;
        UpdateUserProfile({
          displayName: `${data.name} (${badge})`,
          photoURL: data.PhotoUrl,
        })
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.PhotoUrl,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "User Created Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });

            navigate("/");
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("The email address is already in use. Please use another email.");
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
              exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                  name="name"
                  className="input input-bordered"
                  required
                />
                {errors.name && <span className="text-red-500">Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoUrl</span>
                </label>
                <input
                  type="text"
                  placeholder="PhotoUrl"
                  {...register("PhotoUrl", { required: true })}
                  name="PhotoUrl"
                  className="input input-bordered"
                  required
                />
                {errors.PhotoUrl && <span className="text-red-500">PhotoUrl is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input input-bordered"
                  required
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">Password must be 6 characters long</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must have one lowercase, one uppercase, one special character, and one
                    number
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign-Up" />
              </div>
              <Link to={"/signIn"}>
                <p>You already have an account? Click here</p>
              </Link>
              {error && <p className="text-xl text-red-600">{error}</p>}
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
