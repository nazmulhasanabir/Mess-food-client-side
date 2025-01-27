import { Link } from "react-router-dom";

const UserDashboard = () => {
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
        <th>Role</th>
      </tr>
    </thead>
    {/* <tbody>
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
                
                </tr>             
            )
        }
    </tbody> */}

  </table>
</div>
    </div>
        </div>
    );
};

export default UserDashboard;