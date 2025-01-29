import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import CardDetails from "../pages/CardDetails";
import AllMeal from "../pages/MealCart/AllMeal";
import UpcomingMeal from "../pages/Upcoming/UpcomingMeal";
import CheckOut from "../pages/package/CheckOut";
import SignUp from "../pages/Join Us/SignUp";
import SignIn from "../pages/Join Us/SignIn";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../pages/Review/AddReview";
import Payment from "../pages/package/Payment";
import PaymentHistory from "../pages/package/Payment/PaymentHistory";
import AllUsers from "../pages/Dashboard/AllUsers";
import MyReview from "../pages/Review/MyReview";
import AdminRoute from "./AdminRoute";
import AddMeal from "../pages/Dashboard/AdminUser/AddMeal";
import AllMeal_admin from "../pages/Dashboard/AdminUser/AllMeal_admin";
import AllReview from "../pages/Dashboard/AdminUser/AllReview";
import ServeMeal from "../pages/Dashboard/AdminUser/ServeMeal";
import UpcomingMealsAdmin from "../pages/Dashboard/AdminUser/UpcomingMealsAdmin";
import AddUpcoming from "../pages/Dashboard/AdminUser/AddUpcoming";
import Register from "../pages/Join Us/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "meals/:id",

        element: (
          <PrivateRoute>
            <CardDetails></CardDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://hostel-manaegement-server-side.vercel.app/meals/${params.id}`),
      },
      {
        path: "/usermeal",
        element: <AllMeal></AllMeal>,
      },
      {
        path: "upcoming",
        element: <UpcomingMeal></UpcomingMeal>,
      },
      {
        path: "/package/:price",
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>,
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://hostel-manaegement-server-side.vercel.app/package/${params.price}`),
      },

      {
        path: "signUp",
        element: <Register></Register>
      },
      // {
      //   path: "signUp",
      //   element: <SignUp></SignUp>,
      // },
      {
        path: "signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "review/:id",
        element: <PrivateRoute>
          <AddReview></AddReview>
        </PrivateRoute>,
      },
      {
        path:'paymentHistory',
        element:<PrivateRoute>
          <PaymentHistory></PaymentHistory>
        </PrivateRoute>
      },
      {
        path: "payment/:price",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path:'/payhistory',
        element:<PrivateRoute>
          <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        
      },
      {
        path:'/dashboard',
        element:<PrivateRoute>
          <AllUsers></AllUsers>
          </PrivateRoute>
        
      },
      {
        path:'/addMeal',
        element:<AdminRoute><AddMeal></AddMeal> </AdminRoute>
      },
      {
        path:'/adminAllMeal',
        element:<AdminRoute>
          <AllMeal_admin></AllMeal_admin>
           </AdminRoute>
      },
      {
        path:'/allReview',
        element:<AdminRoute>
          <AllReview></AllReview>
           </AdminRoute>
      },
      {
        path:'/serveMeal',
        element:<AdminRoute>
            <ServeMeal></ServeMeal>
           </AdminRoute>
      },
      {
        path:'/upcomingMeal',
        element:<AdminRoute>
          <UpcomingMealsAdmin></UpcomingMealsAdmin>
           </AdminRoute>
      },
      {
        path:'/addUpcoming',
        element:<AdminRoute>
          <AddUpcoming></AddUpcoming>
           </AdminRoute>
      },
      {
        path:'/myReviews',
        element:<PrivateRoute>
          <MyReview></MyReview>
        </PrivateRoute>
        
      },
    ],
  },
 
]);
