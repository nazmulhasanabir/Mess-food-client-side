import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import UseAxiosSecure from "../../axios/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payment , setpayment] = useState([])
  const axiosSecure = UseAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      setpayment(res.data)
      return res.data;
    },
  });
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      
    {
      payment.map((item,index) => (  
      <tr>
        <th>{index+1}</th>
        <td>{item.price}</td>
        <td>{item.transactionId}</td>
        <td>{item.status}</td>
      </tr>
      ))
    }
    </tbody>
  </table>
</div>
    </div>

  )
};

export default PaymentHistory;
