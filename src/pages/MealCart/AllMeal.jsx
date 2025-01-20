import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
import MealCart from "./MealCart";

const AllMeal = () => {
    const AllMeal = async () => {
        const response = await fetch('http://localhost:5000/meals')
        return response.json()
    }

    const {data:meal=[], isLoading} = useQuery({
        queryKey:['meals'],
        queryFn:AllMeal
    })
     if (isLoading) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
         <div className="grid md:grid-cols-3 gap-10">
            {meal.map((items) => (
              <MealCart key={items.id} items={items}></MealCart>
            ))}
          </div>
        </div>
    );
};

export default AllMeal;