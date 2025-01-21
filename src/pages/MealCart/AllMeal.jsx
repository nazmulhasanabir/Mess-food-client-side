import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
import MealCart from "./MealCart";

const AllMeal = () => {
  const AllMeal = async () => {
    const response = await fetch("http://localhost:5000/meals");
    return response.json();
  };

  const { data: meal = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: AllMeal,
  });

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
    <div className="">
        {/* search function */}
     <div className="flex flex-row justify-center items-center ">
     <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {/* filter  */}
      <select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Who shot first?</option>
  <option>Han Solo</option>
  <option>Greedo</option>
</select>
     </div>
      <div className="grid md:grid-cols-3 gap-10">
        {meal.map((items) => (
          <MealCart key={items.id} items={items}></MealCart>
        ))}
      </div>
    </div>
  );
};

export default AllMeal;
