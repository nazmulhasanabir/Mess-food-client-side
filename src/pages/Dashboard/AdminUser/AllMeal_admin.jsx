import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import UseAxiosPublic from "../../axios/UseAxiosPublic";

const AllMeal_admin = () => {
  const axiosPublic = UseAxiosPublic();
  const [meals, setMeals] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  

  // Fetch meals with sorting
  useEffect(() => {
    axiosPublic
      .get("http://localhost:5000/meals")
      .then((response) => setMeals(response.data))
      .catch((error) => console.error("Error fetching upcoming meals:", error));
  }, []);
console.log(meals)
  // Handle Delete
  const handleDelete = async (_id) => {


    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

   
    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/meals/${_id}`);
        setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== _id));

        // Show success message after deletion
        Swal.fire({
          title: "Deleted!",
          text: "The meal has been deleted.",
          icon: "success",
          timer: 2000, // Optional: Auto-dismiss after 2 seconds
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting meal:", error);

        // Show error message if deletion fails
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the meal.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }

  };

  // Handle Update
  const handleUpdate = async (mealData) => {
    try {
      await axios.patch(
        `http://localhost:5000/meals/${mealData._id}`,
        mealData // Send updated meal data
      );
    
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal._id === mealData._id ? { ...meal, ...mealData } : meal
        )
      );

      Swal.fire({
        title: "Updated!",
        text: "Meal updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating meal:", error);

      Swal.fire({
        title: "Error!",
        text: "There was an error updating the meal.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  // if (!meals) {
  //   return <h1>Loading...</h1>;
  // }

  const handleSort = (field) => {
    setSortBy(field);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Meals</h1>
      <div className="flex justify-end space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleSort("likes")}
        >
          Sort by Likes
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleSort("reviews_count")}
        >
          Sort by Reviews Count
        </button>
      </div>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
        <th className="p-2 border">#</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Likes</th>
            <th className="p-2 border">Reviews Count</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Distributor</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals?.map((meal, index) => (
            <tr key={meal._id} className="hover:bg-gray-50">
                   <td className="p-2 border">{index+1}</td>
              <td className="p-2 border">{meal.meal_name}</td>
              <td className="p-2 border">{meal.likes}</td>
              <td className="p-2 border">{}</td>
              <td className="p-2 border">{meal.rating}</td>
              <td className="p-2 border">{meal.distributor_name}</td>
              <td className="p-2 border flex space-x-2">
                <Link to={`/meals/${meal._id}`}>
                  <button className="px-2 py-1 bg-green-500 text-white rounded">
                    View
                  </button>
                </Link>
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleUpdate(`/meals/edit/${meal._id}`)}
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(meal._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMeal_admin;
