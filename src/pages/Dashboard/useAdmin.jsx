import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import UseAxiosSecure from "../axios/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const {data:isAdmin, isPending:isAdminloading} = useQuery({
        queryKey:[user?.email , 'isAdmin'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            console.log(res.data.admin);
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminloading]
};

export default useAdmin;