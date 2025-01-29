import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProviders";

const AddMeal = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    const mealData = {
      meal_name: data.title,
      category: data.category,
      distributor_name: user?.displayName || "Admin",
      description: data.description,
      ingredients: data.ingredients.split(","),
      postTime: new Date().toISOString(),
      rating: 0,
      price: parseFloat(data.price),
      distributorEmail: user?.email,
      image: imagePreview || "", 
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/addMeal",
        mealData
      );
      if (response.data.result.insertedId) {
        Swal.fire("Success!", "Meal has been added successfully.", "success");
        reset(); // Reset form
        setImagePreview(null); // Reset image preview
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      Swal.fire("Error!", "Something went wrong while adding the meal.", "error");
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-bold text-center mb-4">Add Meal</h2>

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter meal title"
                  className="input input-bordered"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title.message}</span>
                )}
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter category (e.g., Breakfast, Dinner)"
                  className="input input-bordered"
                  {...register("category", { required: "Category is required" })}
                />
                {errors.category && (
                  <span className="text-red-500 text-sm">{errors.category.message}</span>
                )}
              </div>

              {/* Ingredients */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ingredients</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter ingredients (comma-separated)"
                  className="input input-bordered"
                  {...register("ingredients", {
                    required: "Ingredients are required",
                  })}
                />
                {errors.ingredients && (
                  <span className="text-red-500 text-sm">{errors.ingredients.message}</span>
                )}
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Enter meal description"
                  className="textarea textarea-bordered"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description.message}</span>
                )}
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter price"
                  className="input input-bordered"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">{errors.price.message}</span>
                )}
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Meal Image</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 text-center">
                  <img
                    src={imagePreview}
                    alt="Meal Preview"
                    className="w-full h-40 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Distributor Name (readonly) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Distributor Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={user?.displayName || "Admin"}
                  readOnly
                />
              </div>

              {/* Distributor Email (readonly) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Distributor Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
