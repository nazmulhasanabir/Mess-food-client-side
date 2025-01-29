import { useState, useEffect } from "react";
import UseAxiosPublic from "../../axios/UseAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UpcomingMealsAdmin = () => {
  const axiosPublic = UseAxiosPublic();
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ title: "", likes: 0 });

  // Fetch upcoming meals
  useEffect(() => {
    axiosPublic
      .get("http://localhost:5000/upcoming")
      .then((response) => setUpcomingMeals(response.data))
      .catch((error) => console.error("Error fetching upcoming meals:", error));
  }, []);

  // Handle Publish Meal
  const handlePublish = (meal) => {
    axiosPublic
      .post("http://localhost:5000/addMeal", meal)
      .then((response) => {
        console.log(response);
      if(response.data > 0){
        Swal.fire(
          "Published!",
          "The meal has been published successfully.",
          "success"
        );
        setUpcomingMeals((prev) => prev.filter((m) => m._id !== meal._id));

      }}).catch((error) => {  
        console.error("Error publishing meal:", error);
        Swal.fire("Error!", "Something went wrong while publishing the meal.", "error");
      });
    
  };

  return (
    <div>
      <h2 className="text-3xl">Upcoming Meals</h2>
      <Link to={`/addUpcoming`}>
        <button className="btn btn-primary my-4">Add Upcoming Meal</button>
      </Link>
      {/* Add Upcoming Meal Button */}

      {/* Table for Upcoming Meals */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.map((meal, index) => (
              <tr key={meal._id}>
                <td>{index + 1}</td>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>
                  <button
                    onClick={() => handlePublish(meal)}
                    className="btn btn-success"
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Upcoming Meal Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Upcoming Meal</h3>
            <input
              type="text"
              placeholder="Meal Title"
              className="input input-bordered w-full my-2"
              value={newMeal.title}
              onChange={(e) =>
                setNewMeal({ ...newMeal, title: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Likes"
              className="input input-bordered w-full my-2"
              value={newMeal.likes}
              onChange={(e) =>
                setNewMeal({ ...newMeal, likes: parseInt(e.target.value) })
              }
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddMeal}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMealsAdmin;
