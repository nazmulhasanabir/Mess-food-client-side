import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {signIn,logout} = useContext(AuthContext)
  const {register,handleSubmit,watch,formState:{errors}} = useForm()
  const onSubmit = data => {
    signIn(data.email,data.password)
    .then(result=>{
      const user = result.user
      console.log(user);
    })
  }
  console.log(watch('example'))
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">  
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register('email',{required:true})}
                  placeholder="email"
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
                  name="password"
                  {...register('password',{required:true})}
                  placeholder="password"
                  className="input input-bordered"
                  required
                  />
                  {errors.password && <span className="text-red-500">Password is required</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <Link to={"/signUp"}>
                <p>Are You new there?Click Here</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
