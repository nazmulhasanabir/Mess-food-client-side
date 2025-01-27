import useAdmin from "./useAdmin";
import UserDashboard from "./User Dashboard/RequestMeal";
import AdminDashboard from "./AdminDashboard";

const AllUsers = () => {
  const [isAdmin] = useAdmin();

  return (
    <>
      {isAdmin ? (
        <AdminDashboard></AdminDashboard>
      ) : (
        <UserDashboard></UserDashboard>
      )}
    </>
  );
};

export default AllUsers;
