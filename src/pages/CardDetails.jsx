import { BiSolidLike } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";

const CardDetails = () => {
    const CardDetails = useLoaderData()
    const {meal_name,category,image,distributor_name,description,ingredients,post_time,rating,price,reviews} = CardDetails
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className=" ">
    <img
      src={image}
      className="max-w-3xl rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">{meal_name}</h1>
      <p className="py-6">{description}
      </p>
      <div>
          {
            reviews.map((rev,index)=> <div key={index}>
              <p className="text-3xl font-bold">{rev.user}</p>
            </div>)
          }
        </div>
      <button className="btn btn-primary">Request For Meal</button>
      <button className="btn btn-primary"><BiSolidLike /></button>
      <button className="btn btn-primary">Add Review</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default CardDetails;