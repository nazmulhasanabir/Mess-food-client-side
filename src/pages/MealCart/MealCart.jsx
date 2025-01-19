import React from "react";

const   MealCart = ({items}) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={items.image}
          alt="Shoes"
        />
      </figure>
        <p className="text-xl font-semibold">${items.price}</p>
      <div className="card-body text-center">
        <h2 className="card-title">{items.meal_name}</h2>
        <div className="badge badge-secondary">{items.category}</div>
        <p>{items.description}</p>
        <p className="font-bold">{items.rating}</p>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">See Details</button>
        </div>
      </div>
    </div>
  );
};

export default MealCart;
