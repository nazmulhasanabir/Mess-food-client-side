import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../axios/UseAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const RequestMeal = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);
  const [requestMeal, setRequestMeal] = useState([]);

  // Fetch meal requests
  useEffect(() => {
    axiosPublic
      .get(`http://localhost:5000/mealRequest?email=${user.email}`)
      .then((res) => {
        setRequestMeal(res.data);
      });
  }, [user, axiosPublic]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/mealRequest/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setRequestMeal((prev) =>
                prev.filter((meal) => meal._id !== id)
              );
              Swal.fire("Deleted!", "Your request has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <div>
        <Link to={"/"}>
          <button className="btn btn-lg">Home</button>
        </Link>
        <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">Request Meals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {requestMeal.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
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
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    >
                      <FaDeleteLeft className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestMeal;
