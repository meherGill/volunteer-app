import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import DonateForm from "@components/DonateForm";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51KhjQ7KsYhlOpBjGdEpalmpo9k6XobICJjoRz1Wjh3H3gtSbtZJTwTCTcCXDVdkUbU2Q7IFGCML6xH49HI3eslZo00xahWSwQn";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Donate = () => {
  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // This is your test publishable API key.

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Thank you for donating");
    }

    if (query.get("canceled")) {
      console.log("Payment cancelled");
    }
  }, []);

  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <DonateForm />
        </Elements>
      )}
    </>
  );
};

export default Donate;
