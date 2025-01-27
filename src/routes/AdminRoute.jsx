import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAdmin from "../pages/Dashboard/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = (children) => {
    const [user , loading] = useContext(AuthContext)
    const [isAdmin,isAdminloading] = useAdmin()
    const location = useLocation()
    if(loading || isAdminloading){
        return <div className='w-1/12 mx-auto flex items-center justify-center'>
            (<span className="loading loading-spinner loading-lg "></span>)
        </div>
    }


    if(user && isAdmin){
        return(children)
    }
    return (
        <Navigate to={'/signIn'} state={location?.pathname} ></Navigate>
    )
}
export default AdminRoute;