import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import DonateForm from "@components/DonateForm";

// const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

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

  return <></>;
};

export default Donate;
