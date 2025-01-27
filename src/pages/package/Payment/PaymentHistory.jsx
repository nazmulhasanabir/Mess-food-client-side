import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import UseAxiosSecure from "../../axios/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure= UseAxiosSecure()
    const {data: payments =[]} = useQuery({
        queryKey:['payments', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h2>total payments:{payments.length}</h2>
        </div>
    );
};

export default PaymentHistory;