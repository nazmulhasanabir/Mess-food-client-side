import { Link } from "react-router-dom";
import logo from "../assets/image/d3c6ebfd45e959318ad0935bcb1562cb.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [badge, setBadge] = useState("");
  const handleLogout = () => {
    // console.log("Logging out...");
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sign-Out!",
          text: "Sign-Out successful!",
        });
      })
      .catch((error) => {
        // console.log(error)
      });
  };
  useEffect(() => {
    const fetchBadge = () => {
      if (user?.email) {
        fetch(`http://localhost:5000/get-badge/${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setBadge(data.badge);
            } else {
              setBadge("");
            }
          })
          .catch((error) => console.error("Error fetching badge:", error));
      }
    };

    fetchBadge();
    const interval = setInterval(fetchBadge, 5000);

    return () => clearInterval(interval);
  }, [user?.email]);
  if (badge === "Bronze") {
    <div className="badge bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">
      Bronze
    </div>;
  } else if (badge === "Silver") {
    <div className="badge bg-gradient-to-r from-gray-300 to-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
      Silver
    </div>;
  } else if (badge === "Gold") {
    <div className="badge bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
      Gold
    </div>;
  } else {
    <div className="badge bg-gradient-to-r from-gray-400 to-gray-200 text-white font-bold py-2 px-4 rounded-full shadow-lg">
      Platinum
    </div>;
  }

  {
    const food = (
      <>
        {user ? (
          <>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/usermeal"}>
              <li>Meals</li>
            </Link>
            <Link to={"/upcoming"}>
              <li>Upcoming Meals</li>
            </Link>
            <Link to={"/about"}>
              <li>About Us</li>
            </Link>
            <Link to={"/find"}>
              <li>Find Us</li>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/usermeal"}>
              <li>Meals</li>
            </Link>
            <Link to={"/upcoming"}>
              <li>Upcoming Meals</li>
            </Link>
            <Link to={"/about"}>
              <li>About Us</li>
            </Link>
          </>
        )}
      </>
    );
    return (
      <div className="sticky top-0 z-50">
        <div className="navbar bg-red-700 text-white font-bold px-10 ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                <p className="btn btn-ghost text-xl">Mess Food</p>
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
                  <div className="group relative w-12 h-12 z-10 ">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user?.photoURL}
                    />
                    <div className="absolute right-0 top-14 hidden w-max px-2 py-1  text-sm text-white bg-gray-800 rounded-md group-hover:block">
                      {user.name}
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
                  <div className="flex items-center  flex-col p-2 ">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />

                    <div className="text-center p-3">
                      <Link to={"/dashboardSecond"}>
                        <button className="text-white ">Dashboard</button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="dark:bg-red-600  p-1   rounded-xl text-white "
                      >
                        Log-out
                      </button>
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
  }
};
export default Navbar;
