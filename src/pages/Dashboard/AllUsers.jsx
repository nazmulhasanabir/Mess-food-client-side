import useAdmin from "./useAdmin";
import RequestMeal from "./User Dashboard/RequestMeal";
import AdminDashboard from "./AdminDashboard";

const AllUsers = () => {
  const [isAdmin] = useAdmin();

  return (
    <>
      {isAdmin ? (
        <AdminDashboard></AdminDashboard>
      ) : (
        <RequestMeal></RequestMeal>
      )}
    </>
  );
};

export default AllUsers;
