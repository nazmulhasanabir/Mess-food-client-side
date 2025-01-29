import { Link, useLoaderData } from "react-router-dom";

const CheckOut = () => {
  const CheckOut = useLoaderData();
  const { package_name, facilities, price } = CheckOut;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Package Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">{package_name}</h2>
          <p className="text-xl text-white mt-2">${price}</p>
        </div>

        {/* Package Facilities */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Facilities Included:</h3>
          <ul className="space-y-3">
            {facilities.map((facility, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-500">✔</span>
                <span className="text-gray-700">{facility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkout Button */}
        <div className="p-6 border-t">
          <Link to={`/payment/${price}`} className="w-full">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;