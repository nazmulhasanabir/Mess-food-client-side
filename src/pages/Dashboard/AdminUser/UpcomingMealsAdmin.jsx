import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../axios/UseAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

const AddUpcoming = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = UseAxiosPublic();
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  

  useEffect(() => {
    axiosPublic
      .get("http://localhost:5000/upcoming")
      .then((response) => setUpcomingMeals(response.data))
      .catch((error) => console.error("Error fetching upcoming meals:", error));
  }, []);

  
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const response = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.data.success) {
        return response.data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };


  const onSubmit = async (data) => {
    const imageUrl = await uploadImage(data.image[0]);
    if (!imageUrl) return;
  
    const newMeal = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: imageUrl,
      ingredients: data.ingredients,
      likes: 0,
    };

    axiosPublic
      .post("http://localhost:5000/upcoming", newMeal)
      .then((response) => {
        setUpcomingMeals((prev) => [...prev, { ...newMeal, _id: response.data.mealId }]);
        setShowModal(false);
        reset();
        Swal.fire("Added!", "The upcoming meal has been added successfully.", "success");
      })
      .catch((error) => console.error("Error adding upcoming meal:", error));
  };
  const handlePublish = async (meal) => {
    try {
      const response = await axiosPublic.post("/addMeal", meal);
      console.log(response.data.result.insertedId);
      if (response.data.result.insertedId) {
        setUpcomingMeals((prevMeals) => prevMeals.filter((m) => m._id !== meal._id));
        Swal.fire("Published!", "The meal has been published successfully.", "success");
      }
    } catch (error) {
      console.error("Error publishing meal:", error);
      Swal.fire("Error!", "Failed to publish the meal.", "error");
    }
  };
  return (
    <div>
      <h2 className="text-3xl">Upcoming Meals</h2>

      {/* Add Meal Button */}
      <button className="btn btn-primary my-4" onClick={() => setShowModal(true)}>
        Add Upcoming Meal
      </button>

      {/* Table */}
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
                <td>{meal.ingredients}</td>
                <td>
  <button className="btn btn-success" onClick={() => handlePublish(meal)}>
    Publish
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box h-[800px]">
            <h3 className="font-bold text-lg">Add Upcoming Meal</h3>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Meal Title"
                className="input input-bordered w-full my-2"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full my-2"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}

              <select
                className="select select-bordered w-full my-2"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}

              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full my-2"
                {...register("price", { required: "Price is required", valueAsNumber: true })}
              />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}

              {/* Image Upload */}
              <input
                type="file"
                className="file-input file-input-bordered w-full my-2"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && <p className="text-red-500">{errors.image.message}</p>}

              <input
                type="text"
                placeholder="Ingredients"
                className="input input-bordered w-full my-2"
                {...register("ingredients", { required: "Ingredients are required" })}
              />
              {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUpcoming;
