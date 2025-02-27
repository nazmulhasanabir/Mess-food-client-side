import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useContext } from "react";
const Dashboard = () => {
      const { user } = useContext(AuthContext);
    return (
        <div>
            <div className="flex ">
                <div className="w-64 min-h-screen bg-orange-400 p-10">
                <div className="flex justify-center">
          
                      {user.role === "admin" ? (
                        <div className="flex flex-col justify-center items-center gap-2">
                          <h2 className="text-xl font-bold">Dashboard</h2>
                        <div className="text-xs text-center flex flex-col justify-center items-center gap-4 p-3 rounded-3xl bg-teal-600">
                        <img   className="w-16 h-16 rounded-full" src={user.photoURL} alt="" />
                      <p className="text-white lg:block  font-semibold text-xs">{user.name}</p>
                      <p className="text-white lg:block  font-semibold text-xs">{user.email}</p>
                    <p className="badge badge-success mt-1  p-3 text-white">Admin Dashboard</p>
                    </div>
                    <Link to={'/'}>
        <button className="dark:bg-red-600 p-2 hover:text-black    rounded-xl text-white">home</button>
        </Link>
                          <Link to={"/dashboardSecond/dashboard"}>
                            <button className="dark:bg-red-600 p-2 hover:text-black    rounded-xl text-white ">
                              Manage Users
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/addMeal"}>
                            <button className="dark:bg-red-600  p-2 hover:text-black  rounded-xl text-white ">
                              Add Meal
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/adminAllMeal"}>
                            <button className="dark:bg-red-600  p-2 hover:text-black  rounded-xl text-white ">
                              Admin All Meal
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/allReview"}>
                            <button className="dark:bg-red-600  p-2 hover:text-black  rounded-xl text-white ">
                              All Review
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/serveMeal"}>
                            <button className="dark:bg-red-600  p-2 hover:text-black  rounded-xl text-white ">
                              Serve Meal
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/upcomingMeal"}>
                            <button className="dark:bg-red-600  p-2 hover:text-black  rounded-xl text-white ">
                              Upcoming Meal
                            </button>
                          </Link>
                      
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                             <div className="text-xs text-center flex flex-col justify-center items-center gap-4 p-3 rounded-3xl bg-teal-600">
                        <img   className="w-16 h-16 rounded-full" src={user.photoURL} alt="" />
                      <p className="text-white lg:block  font-semibold text-xs">{user.name}</p>
                      <p className="text-white lg:block  font-semibold text-xs">{user.email}</p>
                    <p className="badge badge-success mt-1  p-3 text-white">{user.badge}</p>
                    </div>
       
                    <Link to={'/'}>
        <button className="dark:bg-red-600 p-2 hover:text-black    rounded-xl text-white">home</button>
        </Link>
                          <Link to={"/dashboardSecond/dashboard"}>
                            <button className="dark:bg-red-600    rounded-xl text-white ">
                              Requested Meal
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/payhistory"}>
                            <button className="dark:bg-red-600    rounded-xl text-white ">
                              Payment History
                            </button>
                          </Link>
                          <Link to={"/dashboardSecond/myReviews"}>
                            <button className="dark:bg-red-600    rounded-xl text-white ">
                              My Reviews
                            </button>
                          </Link>
                        
                        </div>
                      )}
                    </div>
                    <div className="divider"></div>
                </div>
                    <div className="w-8/12 mx-auto">
                    <Outlet></Outlet>
                    </div>
        </div>
        </div>
    );
};

export default Dashboard;