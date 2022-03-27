import { useState } from "react";
import { useRouter } from "next/router";

import getStripe from "@lib/get-stripe";
import { fetchPostJSON } from "@utils/api-helpers";

const DonateForm = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(50);
  const [organization, setOrganization] = useState("Red Cross");

  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetchPostJSON("/api/donate", {
      amount: amount,
    });
    // Redirect to Checkout.
    const stripe = await getStripe();

    console.log(response);
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckot` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen bg-orange-50">
      <div className="w-full h-16 bg-orange-200">
        <button
          className="h-full p-3 px-8 bg-orange-300"
          onClick={() => router.push("/VolunteerHome")}
        >
          BACK
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center rounded-md"
      >
        <h1 className="mt-10 text-2xl text-gray-500 rounded-md">
          Make donation to support a cause
        </h1>
        <h4>Make donation to support a cause</h4>
        <input
          type="number"
          className="px-3 py-2 mt-10 rounded-md"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        <h1 className="mt-10 text-2xl text-gray-500 rounded-md">OR</h1>
        <h1 className="text-2xl text-gray-500 rounded-md">
          DONATE OTHER THINGS
        </h1>
        <textarea
          className="px-3 py-2 mt-10 w-4/5 rounded-md"
          placeholder="Write about what you are going to donate"
        ></textarea>
        <h1 className="mt-10 text-2xl text-gray-500 rounded-md">
          CHOOSE YOUR CHARITY
        </h1>
        <input
          type="text"
          onChange={(e) => setOrganization(e.target.value)}
          className="mt-5 px-3 py-2 rounded-md"
        />

        <button
          className="bg-orange-200 p-3 mt-10 rounded-lg"
          type="submit"
          disabled={loading}
        >
          Donate
          {`A$${amount <= 5 || isNaN(amount) ? 5 : amount} to ${organization}`}
        </button>
      </form>
    </div>
  );
};

export default DonateForm;
