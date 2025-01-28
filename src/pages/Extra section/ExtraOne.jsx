import { FaLeaf, FaStar, FaShippingFast } from "react-icons/fa";

const ExtraOne = () => {
  return (
    <div>
    <div className="bg-white py-12 px-6 text-center">
    <h2 className="text-3xl font-bold text-gray-900">WHY CHOOSE OUR MESS MEAL?</h2>
<p className="text-gray-600 mt-2 mb-8">
  We provide nutritious, hygienic, and affordable mess meals, ensuring quality food with timely delivery every day.
</p>

<div className="grid md:grid-cols-3 gap-6">
  {/* Card 1 */}
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <FaLeaf className="text-green-500 text-4xl mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900">Nutritious & Balanced Meals</h3>
    <p className="text-gray-600 mt-2">
      We serve well-balanced, nutritious meals to keep you healthy and energized every day.
    </p>
  </div>

  {/* Card 2 */}
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <FaStar className="text-green-500 text-4xl mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900">Hygienic & Fresh Ingredients</h3>
    <p className="text-gray-600 mt-2">
      Our meals are prepared with fresh, high-quality ingredients in a hygienic environment.
    </p>
  </div>

  {/* Card 3 */}
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <FaShippingFast className="text-green-500 text-4xl mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900">Timely Meal Delivery</h3>
    <p className="text-gray-600 mt-2">
      We ensure on-time meal delivery so you never have to worry about missing a meal.
    </p>
  </div>
</div>

    </div>
    </div>
  );
};

export default ExtraOne;
