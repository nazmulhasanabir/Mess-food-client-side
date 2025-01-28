import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllMeal_admin = () => {
    const [meals, setMeals] = useState([]);
  const [sortBy, setSortBy] = useState(""); 
  const navigate = useNavigate();

  // Fetch meals with sorting
  const fetchMeals = async (sortBy = "") => {
    try {
      const { data } = await axios.get(`http://localhost:5000/meals`, {
        params: { sortBy },
      });
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Fetch meals initially and whenever sortBy changes
  useEffect(() => {
    fetchMeals(sortBy);
  }, [sortBy]);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meal?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/meals/${id}`);
        setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
      } catch (error) {
        console.error("Error deleting meal:", error);
      }
    }
  };


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
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Likes</th>
                <th className="p-2 border">Reviews Count</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Distributor</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{meal.title}</td>
                  <td className="p-2 border">{meal.likes}</td>
                  <td className="p-2 border">{meal.reviews_count}</td>
                  <td className="p-2 border">{meal.rating}</td>
                  <td className="p-2 border">{meal.distributor_name}</td>
                  <td className="p-2 border flex space-x-2">
                    <Link to={(`/meals/${meal._id}`)}>
                    
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      View
                    </button>
                    </Link>
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => navigate(`/meals/edit/${meal.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(meal.id)}
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