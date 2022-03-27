import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

const DonateForm = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(50);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Default options are marked with *
      const response = await fetch("", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
    // Redirect to Checkout.
    // const stripe = await getStripe()
    // const { error } = await stripe!.redirectToCheckout({
    //   // Make the id field from the Checkout Session creation API response
    //   // available to this file, so you can provide it as parameter here
    //   // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    //   sessionId: response.id,
    // })
    // // If `redirectToCheckot` fails due to a browser or network
    // // error, display the localized error message to your customer
    // // using `error.message`.
    // console.warn(error.message)
    // setLoading(false)
  };
};

export default DonateForm;
