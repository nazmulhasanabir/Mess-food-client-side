import React from 'react';
import UseAxiosSecure from '../axios/UseAxiosSecure';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const axiosSecure = UseAxiosSecure();
    const handleMakeAdmin = users => {
        axiosSecure.patch(`/users/admin/${users._id}`)
        .then(res => {
            // console.log(res.data)
            if(res.data.modifiedCount > 0){
                    refetch()
                Swal.fire({
                    // position: "top-center",
                    icon: "success",
                    title: `${users.name} Has been admin`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const {refetch,data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosSecure.get("/users", {
            headers:{
                authorization : `Bearer ${localStorage.getItem('access-token')}`
            }
          })
          return res.data;
        },
      });
    return (
        <div>
               <div>
        <Link to={'/'}>
        <button className="btn btn-lg">home</button>
        </Link>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users{users.length}</h2>
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
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map((item ,index) =>
                <tr key={item._id}>
                    <th>{index +1}</th> 
               
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.photo}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm opacity-50"></div>
                      </div>
                    </div>
                  </td>
                  
                  <td>{item.email}</td>
                  <th>
                  { item.role === 'admin' ? 'Admin' :  <button className="btn btn-ghost btn-lg bg-orange-400"
                        onClick={() => handleMakeAdmin(item)}

                    >

                        <FaUser className="text-white text-2xl"></FaUser>
                    </button>}
                  </th>
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

export default AdminDashboard;