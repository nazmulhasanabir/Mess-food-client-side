import { Link, useLoaderData } from "react-router-dom";

const CheckOut = () => {
  const CheckOut = useLoaderData();
  const { package_name, facilities, price } = CheckOut;
  return (
    <div>
          <h2>${price}</ h2>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{package_name}</h2>
          {
            facilities.map(fa => <p>   {fa} </p>)
          }
          <div className="card-actions justify-end">
            <Link to={`/payment/${price}`}> 
            <button className="btn btn-primary">CheckOut</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
