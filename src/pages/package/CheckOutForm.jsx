import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../axios/UseAxiosSecure";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const [error, setError] = useState("");
  const [ClientSiteSecret, setClientSiteSecret] = useState("");
  const [transactionId, setTransactionId] = useState();
  const axiosSecure = UseAxiosSecure();
  const { price } = useParams();
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState("");

  useEffect(() => {
    if (price === "5000") {
      setPackages("Silver");
    } else if (price === "8000") {
      setPackages("Golden");
    } else {
      setPackages("Platinum");
    }

    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: parseFloat(price) })
        .then((res) => {
          setClientSiteSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !element) {
      return;
    }

    const card = element.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("error", error);
      setError(error.message);
      return;
    }

    setError("");

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(ClientSiteSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error(confirmError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        packPrice: price,
        transactionId: paymentIntent.id,
        pack_name: packages,
        badge: packages,
        date: new Date(),
        status: "Success",
      };

      const res = await axiosSecure.post("/payments", payment);
      if (res.data.insertedId) {
        await axiosSecure
          .patch(`/update-badge/${user.email}`, { badge: packages })
          .then(() => {
            Swal.fire({
              // position: "top-center",
              icon: "success",
              title: `Your payment is successful! You've earned a ${packages} badge!`,
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            console.error("Failed to update badge:", error);
          });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Complete Your Payment</h2>

        <div className="space-y-2">
          <label htmlFor="card-element" className="text-sm font-semibold text-gray-600">Card Information</label>
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="flex flex-col space-y-4">
          <div className="space-x-2 text-lg font-semibold text-gray-700">
            <p>Package: <span className="font-bold">{packages}</span></p>
            <p>Price: <span className="font-bold">${price}</span></p>
          </div>

          <button
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
            type="submit"
            disabled={!stripe || !ClientSiteSecret}
          >
            Pay Now
          </button>
        </div>

        {transactionId && (
          <p className="text-green-600 text-center text-sm">
            Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
