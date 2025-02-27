import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
import { Link } from "react-router-dom";

const MealPackage = () => {
  const PackageFetch = async () => {
    const response = await fetch(
      "http://localhost:5000/package"
    );
    return response.json();
  };

  const { data: MealPackage = [], isLoading } = useQuery({
    queryKey: ["package"],
    queryFn: PackageFetch,
  });

  const getBackgroundColor = (packageName) => {
    if (packageName === "Silver Package") return "bg-gray-300";
    if (packageName === "Gold Package") return "bg-yellow-400";
    if (packageName === "Platinum Package") return "bg-orange-100";
    return "bg-white";
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  return (
    <div className="mt-10 p-4">
      <p className="divider divider-error py-5 text-center text-3xl font-bold text-red-600">Meal Packages</p>
      <div className="grid md:grid-cols-3 gap-6">
        {MealPackage.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
          >
            {/* Package Header */}
            <div
              className={`p-8 text-center ${getBackgroundColor(
                item.package_name
              )}`}
            >
              <h2 className="text-2xl font-bold mb-2">{item.package_name}</h2>
              <p className="text-xl font-semibold">${item.price}</p>
            </div>

            {/* Package Facilities */}
            <div className="p-6">
              <ul className="space-y-3">
                {item.facilities.map((facility, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span className="text-gray-700">{facility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Checkout Button */}
            <div className="p-6 border-t">
              <Link to={`/package/${item.price}`}>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPackage;