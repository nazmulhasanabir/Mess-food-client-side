import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import UseAxiosSecure from "../../axios/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payment, setPayment] = useState([]);
  const axiosSecure = UseAxiosSecure();

  const { isLoading, isError } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      setPayment(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-6 text-blue-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-6 text-red-500">
        Failed to fetch payment history. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment History
      </h2>

      {payment.length === 0 ? (
        <div className="text-center text-gray-500">
          No payment history found. Make your first payment to see it here!
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border-collapse border border-gray-300">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300">#</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300">
                  Transaction ID
                </th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {payment.map((item, index) => (
                <tr key={item.transactionId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    ${Number(item.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {item.transactionId}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-300 text-center ${
                      item.status === "Completed"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
