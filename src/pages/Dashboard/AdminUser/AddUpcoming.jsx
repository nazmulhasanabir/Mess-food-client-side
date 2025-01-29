import { useState, useEffect } from "react";
import UseAxiosPublic from "../../axios/UseAxiosPublic";
import Swal from "sweetalert2";

const AddUpcoming = () => {
  const axiosPublic = UseAxiosPublic();
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    ingredients: "",
    likes: 0,
  });

  // Fetch upcoming meals
  useEffect(() => {
    axiosPublic
      .get("http://localhost:5000/upcoming")
      .then((response) => setUpcomingMeals(response.data))
      .catch((error) => console.error("Error fetching upcoming meals:", error));
  }, []);

  // Handle Add Meal
  const handleAddMeal = () => {
    axiosPublic
      .post("http://localhost:5000/upcoming", newMeal)
      .then((response) => {
        setUpcomingMeals((prev) => [...prev, { ...newMeal, _id: response.data.mealId }]);
        setShowModal(false);
        setNewMeal({
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
          ingredients: "",
          likes: 0,
        });
        Swal.fire("Added!", "The upcoming meal has been added successfully.", "success");
      })
      .catch((error) => console.error("Error adding upcoming meal:", error));
  };

  return (
    <div>
      <h2 className="text-3xl">Upcoming Meals</h2>

      {/* Add Upcoming Meal Button */}
      <button className="btn btn-primary my-4" onClick={() => setShowModal(true)}>
        Add Upcoming Meal
      </button>

      {/* Table for Upcoming Meals */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.map((meal, index) => (
              <tr key={meal._id}>
                <td>{index + 1}</td>
                <td>{meal.title}</td>
                <td>{meal.category}</td>
                <td>${meal.price}</td>
                <td>
                  <button className="btn btn-success">Publish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Upcoming Meal Modal */}
      {showModal && (
        <div className="modal modal-open ">
          <div className="modal-box h-[800px]">
            <h3 className="font-bold text-lg">Add Upcoming Meal</h3>
            <input
              type="text"
              placeholder="Meal Title"
              className="input input-bordered w-full my-2"
              value={newMeal.title}
              onChange={(e) => setNewMeal({ ...newMeal, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full my-2"
              value={newMeal.description}
              onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="input input-bordered w-full my-2"
              value={newMeal.category}
              onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full my-2"
              value={newMeal.price}
              onChange={(e) => setNewMeal({ ...newMeal, price: parseFloat(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full my-2"
              value={newMeal.image}
              onChange={(e) => setNewMeal({ ...newMeal, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ingredients"
              className="input input-bordered w-full my-2"
              value={newMeal.ingredients}
              onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddMeal}>
                Add Meal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUpcoming;
