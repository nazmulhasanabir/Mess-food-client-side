import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import CardDetails from "../pages/CardDetails";
import AllMeal from "../pages/MealCart/AllMeal";

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
        },
        {
          path:'allMeal',
          element:<AllMeal></AllMeal>
        }
      ]
    },
  ]);