import { useState, useEffect } from "react";
import UseAxiosPublic from "../../axios/UseAxiosPublic"; // Custom Axios hook
import { FaCheckCircle } from "react-icons/fa";
import UseAxiosSecure from "../../axios/UseAxiosSecure";

const ServeMeal = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const [mealRequests, setMealRequests] = useState([]);
  const [search, setSearch] = useState("");


  // useEffect(() => {
  //   axiosPublic
  //     .get(`http://localhost:5000/mealRequest?username=${search}`)
  //     .then((res) => {
  //       setMealRequests(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching meal requests:", err);
  //     });
  // }, [search, axiosPublic]);
  useEffect(() => {
    axiosSecure
      .get(`http://localhost:5000/AllMealRequest`)
      .then((res) => {
        setMealRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching meal requests:", err);
      });
  }, []);


  const handleServe = (id) => {
    axiosPublic
      .put(`http://localhost:5000/mealRequest/serve/${id}`)
      .then((response) => {
        console.log("Meal served:", response.data);
  
   
        setMealRequests((prevMeals) =>
          prevMeals.map((meal) =>
            meal._id === id ? { ...meal, status: "delivered" } : meal
          )
        );
      })
      .catch((error) => {
        console.error(
          "Error serving meal:",
          error.response ? error.response.data : error.message
        );
      });
  };
  
  return (
    <div>
      <h2 className="text-3xl">Admin Dashboard</h2>
   
      <div className="my-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search by username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>User Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {mealRequests.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.email}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.status === "pending" && (
                    <button
                      onClick={() => handleServe(item._id)}
                      className="btn btn-success"
                    >
                      <FaCheckCircle /> Serve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeal;
