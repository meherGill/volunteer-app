import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { formatAmountForStripe } from "@utils/stripe-helpers";

const stripe = require("stripe")(
  "sk_test_51KhjQ7KsYhlOpBjGs4DvZ8y7siLOdt4BxY53BAV0wXilY9UC1OATtcb5ELWR54AgJqSGywSl0EE0hCDhqvavHGTD00QRD9FTVi"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const amount: number = req.body.amount;
      const CURRENCY = "aud";

      try {
        // Create Checkout Sessions from body params.
        const params: Stripe.Checkout.SessionCreateParams = {
          submit_type: "donate",
          payment_method_types: ["card"],
          line_items: [
            {
              name: "Custom amount donation",
              amount: formatAmountForStripe(amount, CURRENCY),
              currency: CURRENCY,
              quantity: 1,
            },
          ],
          // success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
          success_url: `${req.headers.origin}/VolunteerHome`,
          cancel_url: `${req.headers.origin}/donate-with-checkout`,
        };

        const checkoutSession: Stripe.Checkout.Session =
          await stripe.checkout.sessions.create(params);

        res.status(200).json(checkoutSession);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Internal server error";
        res.status(500).json({ statusCode: 500, message: errorMessage });
      }
      break;

    default:
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
  }
}
