import { Link } from "react-router-dom";
import logo from "../assets/image/d3c6ebfd45e959318ad0935bcb1562cb.jpg";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../pages/Dashboard/useAdmin";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sign-Out!",
          text: "Sign-Out successful!",
        });
      })
      .catch((error) => console.log(error));
  };
  const food = (
    <>
      <Link to={"/"}>
        <li>Home</li>
      </Link>
      <Link to={"/allMeal"}>
        <li>Meals</li>
      </Link>
      <Link to={"/upcoming"}>
        <li>Upcoming Meals</li>
      </Link>
      {user ? (
        <></>
      ) : (
        <>
          {/* <Link to={"/signUp"}>
            <li>Join Us</li>
          </Link> */}
        </>
      )}
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100  bg-opacity-60  text-black font-semibold max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content space-x-6 bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              {food}
            </ul>
          </div>
          <Link className="/">
            <div className="flex items-center">
              <img src={logo} className="rounded-full  w-16 h-16" />
              <a className="btn btn-ghost text-xl">Mess Food</a>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">{food}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="" className=" relative m-1 right-3">
              {user && user?.email ? (
                <div className="group relative w-12 h-12 ">
                  <img className="w-12 h-12 rounded-full" src={user.photoURL} />
                  <div className="absolute right-0 top-14 hidden w-max px-2 py-1  text-sm text-white bg-gray-800 rounded-md group-hover:block">
                    {user.displayName}
                  </div>
                </div>
              ) : (
                <Link>
                  <button className="btn">Login</button>
                </Link>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[url('https://i.pinimg.com/474x/70/76/74/707674868b11a1d4cdb92e681b37b279.jpg')] bg-cover rounded-box  z-[10] p-2  shadow"
            >
              {user && user?.email ? (
                <div className="flex items-center  flex-col ">
                  <img
                    className="w-9 h-9 rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                  <div className="text-xs text-center">
                    <p className="text-white lg:block">{user.displayName}</p>
                    <p className="text-white lg:block">{user.email}</p>
                  </div>

                  <div className="flex justify-center bg-black rounded-2xl p-3">
                    {isAdmin ? (
                      <div className="flex flex-col gap-2">
                        <Link to={"/dashboard"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          Manage Users
                          </button>
                        </Link>
                        <Link to={"/addMeal"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          Add Meal
                          </button>
                        </Link>
                        <Link to={"/adminAllMeal"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          All Meal
                          </button>
                        </Link>
                        <Link to={"/allReview"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          All Review
                          </button>
                        </Link>
                        <Link to={"/serveMeal"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          Serve Meal
                          </button>
                        </Link>
                        <Link to={"/upcomingMeal"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          Upcoming Meal
                          </button>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="dark:bg-red-600    rounded-xl text-white "
                        >
                          Log-out
                        </button>
                      </div>
                    ) : (
                      <div  className="flex flex-col gap-2">
                        <Link to={"/dashboard"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                            Requested Meal
                          </button>
                        </Link>
                        <Link to={"/payhistory"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                            Payment History
                          </button>
                        </Link>
                        <Link to={"/myReviews"}>
                          <button className="dark:bg-red-600    rounded-xl text-white ">
                          My Reviews
                          </button>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="dark:bg-red-600    rounded-xl text-white "
                        >
                          Log-out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={"/signIn"}>
                  <button className="btn">Login</button>
                </Link>
              )}
            </ul>
          </div>
        </div>
        {/* extra          */}
      </div>
    </div>
  );
};

export default Navbar;
