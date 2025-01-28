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
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const badge = "Bronze";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const imgbbAPI = "https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY";

    try {
      // Upload image to ImgBB
      const imgResponse = await fetch(imgbbAPI, {
        method: "POST",
        body: formData,
      });

      const imgResult = await imgResponse.json();
      if (!imgResult.success) throw new Error("Image upload failed");

      const imageUrl = imgResult.data.url;

      // Create user with email & password
      const result = await createUser(data.email, data.password);
      const logUser = result.user;

      await UpdateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: imageUrl,
        badge: badge,
      };

      await axiosPublic.post("/users", userInfo);

      reset();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-500">Name is required</span>}
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Profile Picture</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className="file-input file-input-bordered"
                  onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
                />
                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                {preview && (
                  <img src={preview} alt="Preview" className="mt-2 w-24 h-24 rounded-full" />
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="input input-bordered"
                />
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">Password must be at least 6 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must include uppercase, lowercase, number, and special character
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign Up" />
              </div>

              <Link to={"/signIn"}>
                <p>You already have an account? Click here</p>
              </Link>

              {error && <p className="text-xl text-red-600">{error}</p>}
            </form>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
