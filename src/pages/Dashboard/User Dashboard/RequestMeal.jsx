import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../axios/UseAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const RequestMeal = () => {
  const axiosPublic = UseAxiosPublic()
  const {user} = useContext(AuthContext)
  const [requestmeal, setrequestmeal] = useState([])
   useEffect(() => {
      axiosPublic.get(`http://localhost:5000/mealRequest?email=${user.email}`)
        .then((res) => {
        setrequestmeal(res.data);
      });
    }, [user,axiosPublic]); 
    const handleDelete =( id) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/mealRequest/${id}`,{
            method:'DELETE',
          })
          .then((res)=> res.json())
          .then((data) => {
            console.log(data);
            if(data.deletedCount > 0){
              axiosPublic
              .get(`http://localhost:5000/mealRequest?email=${user.email}`)
              .then((res) => {
                setrequestmeal(res.data); 
              });
             
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })


        }
      });
    }
    return (
        <div>
            <div>
        <Link to={'/'}>
        <button className="btn btn-lg">home</button>
        </Link>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">Users</h2>
        <h2 className="text-3xl"> Users</h2>
      </div>
     <div className="w-6/12 mx-auto">
     <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
      </label>
     </div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Email</th>
      
      </tr>
    </thead>
    <tbody>
        {
            requestmeal.map((item ,index) =>
                <tr key={item._id}>
                    <th>{index +1}</th> 
               
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm opacity-50"></div>
                      </div>
                    </div>
                  </td>
                  
                  <td>{item.email}</td>
                      <button onClick={() => handleDelete(item.idNo)}><FaDeleteLeft className="text-xl"></FaDeleteLeft></button>
                </tr>             
                
            )
        }
    </tbody>
     
  </table>
</div>
    </div>
        </div>
    );
};

export default RequestMeal;