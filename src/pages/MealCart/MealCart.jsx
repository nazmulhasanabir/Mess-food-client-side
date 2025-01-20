import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const MealCart = ({ items }) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={items.image} alt="Shoes" />
      </figure>
      <p className="text-xl font-semibold">${items.price}</p>
      <div className="card-body text-center">
        <h2 className="card-title">{items.meal_name}</h2>
        <div className="badge badge-secondary">{items.category}</div>
        <p>{items.description}</p>
        <p className="font-bold flex items-center justify-center">
          <FaStar />
          {items.rating}
        </p>
      
        <div className="card-actions justify-end">
          <Link to={`meals/${items.id}`}><button className="btn btn-outline  border-0 border-b-4 border-r-4  mt-4">See Details</button></Link>
        </div>
      </div>
    </div>
  );
};

export default MealCart;
