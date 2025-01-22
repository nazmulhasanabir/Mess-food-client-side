import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

const SignUp = () => {
  const {createUser} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = data => {
        createUser(data.email, data.password)
        .then(result =>{
          const userloged = result.user
          console.log(userloged)
        })
      }
    return (
        <div>
                <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">SignUp now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form  onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name"   {...register("name", {required:true})} name="name" className="input input-bordered" required />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email"   {...register("email", {required:true})} name="email" className="input input-bordered" required />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password"  {...register("password",{required: true, minLength:6,
            pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
          })} className="input input-bordered" required />
          {errors.password?.type === "minLength" && (
        <p className="text-red-500">Password must be  6 character</p>)}
          {errors.password?.type === "pattern" && (
        <p className="text-red-500">Password must have one lower case, one uppercase, one special character and one number 6 character</p>)}
        </div>
        <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Sign-Up" />
        </div>
    <Link to={'/signIn'}><p>You have already account?Click Here</p></Link>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default SignUp;