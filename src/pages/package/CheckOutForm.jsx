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
    } else{
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
      console.log("error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    // confirm payment
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
      console.log("confirm error");
    } else {
      console.log("payment intentete", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          packPrice: price,
          transactionId: paymentIntent.id,
          pack_name:packages,
          date: new Date(),
          status : 'Success'
        };
        const res = await axiosSecure.post("/payments", payment);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
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
        <button
          className="btn btn-primary btn-sm "
          type="submit"
          disabled={!stripe || !ClientSiteSecret}
        >
          Pay
        </button>

        {transactionId && (
          <p className="text-green-600">Your Transaction ID :{transactionId}</p>
        )}
        <p>{error}</p>
      </form>
    </>
  );
};

export default CheckOutForm;
