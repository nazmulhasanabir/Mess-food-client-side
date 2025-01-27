import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
  return (
    <div className=" p-10">
        <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>
        </Elements>
    </div>
  );
};

export default Payment;
