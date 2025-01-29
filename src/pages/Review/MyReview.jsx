import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import UseAxiosPublic from "../axios/UseAxiosPublic";
import Swal from "sweetalert2";

const MyReview = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`review?mail=${user.email}`)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
        });
    }
  }, [user]);


  const handleEdit = (id, currentReview) => {
    Swal.fire({
      title: "Edit Your Review",
      input: "textarea",
      inputLabel: "Update your review below:",
      inputValue: currentReview,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: (updatedReview) => {
        if (!updatedReview) {
          Swal.showValidationMessage("Review cannot be empty");
        }
        return updatedReview;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`review/${id}`, { review: result.value })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              const updatedReviews = reviews.map((item) =>
                item._id === id ? { ...item, review: result.value } : item
              );
              setReviews(updatedReviews);
              Swal.fire("Updated!", "Your review has been updated.", "success");
            }
          })
          .catch((err) => {
            console.error("Error updating review:", err);
          });
      }
    });
  };

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`review/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remainingReviews = reviews.filter((review) => review._id !== id);
              setReviews(remainingReviews);
              Swal.fire("Deleted!", "Your review has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error("Error deleting review:", err);
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">My Reviews</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.mealName}</td>
                <td>{review.review}</td>
                <td>
                  <button
                    onClick={() => handleEdit(review._id, review.review)}
                    className="btn btn-sm btn-warning mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-danger mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReview;
