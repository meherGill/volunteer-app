import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

import getStripe from "@lib/get-stripe";

const DonateForm = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(50);
  const [organization, setOrganization] = useState("Red Cross");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    let stripeResponse;

    try {
      // Default options are marked with *
      const response = await fetch("", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify({ amount: amount } || {}), // body data type must match "Content-Type" header
      });
      stripeResponse = await response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
    // Redirect to Checkout.
    const stripe = await getStripe();

    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: stripeResponse.id,
    });
    // If `redirectToCheckot` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  console.log(amount);
  return (
    <form onSubmit={handleSubmit}>
      <h4>Make donation to support a cause</h4>
      <input
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button
        className="checkout-style-background"
        type="submit"
        disabled={loading}
      >
        Donate {`A$ ${amount} to ${organization}`}
      </button>
    </form>
  );
};

export default DonateForm;
