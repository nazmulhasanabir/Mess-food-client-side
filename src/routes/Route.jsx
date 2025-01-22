import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import CardDetails from "../pages/CardDetails";
import AllMeal from "../pages/MealCart/AllMeal";
import UpcomingMeal from "../pages/Upcoming/UpcomingMeal";
import CheckOut from "../pages/package/CheckOut";
import SignUp from "../pages/Join Us/SignUp";
import SignIn from "../pages/Join Us/SignIn";

  export const  router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'meals/:id',
          element:<CardDetails></CardDetails>,
          loader:({params})=> fetch(`http://localhost:5000/meals/${params.id}`)
        },
        {
          path:'allMeal',
          element:<AllMeal></AllMeal>
        },
        {
          path:'upcoming',
          element:<UpcomingMeal></UpcomingMeal>
        },
        {
          path:'/package/:id',
          element:<CheckOut></CheckOut>,
          loader:({params})=> fetch(`http://localhost:5000/package/${params.id}`)
        },
      
        {
          path:'signUp',
          element:<SignUp></SignUp>
        },
        {
          path:'signIn',
          element:<SignIn></SignIn>
        },
      ],
        
    },
  ]);