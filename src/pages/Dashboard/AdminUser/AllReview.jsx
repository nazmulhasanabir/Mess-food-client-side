import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllReview = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/review");
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Delete a review
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/reviews/${id}`);
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Meal Title</th>
            <th className="p-2 border">Reviews Count</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="hover:bg-gray-50">
              <td className="p-2 border">{review.mealName}</td>
              <td className="p-2 border">{review.reviews_count}</td>
              <td className="p-2 border flex space-x-2">
                <Link to={`/meals/${review.id}`}>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded">
                  View Meal
                </button>
                
                </Link>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(review._id)}
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

export default AllReview;
