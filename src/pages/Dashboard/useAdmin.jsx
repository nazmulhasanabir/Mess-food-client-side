import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../axios/UseAxiosPublic";
import UseAxiosSecure from "../axios/UseAxiosSecure";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosPublic = UseAxiosPublic()
    const axiosSecure = UseAxiosSecure()
    const {data:isAdmin, isPending:isAdminloading} = useQuery({
        queryKey:[user?.email , 'isAdmin'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            // console.log(res.data.admin);
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminloading]
};

export default useAdmin;