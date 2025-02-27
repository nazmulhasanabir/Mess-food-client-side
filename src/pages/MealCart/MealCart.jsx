import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const MealCart = ({ items }) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={items.image} alt="Shoes" />
      </figure>
      <p className="text-xl font-semibold">${items.price}</p>
      <div className="card-body ">
        <h2 className="card-title font-bold text-xl">{items.meal_name}</h2>
        
        <p className="text-">{items.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/meals/${items._id}`}>
            <button className="btn btn-outline  border-0 border-b-4 border-r-4  mt-4">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCart;
