import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(
  "sk_test_51KhjQ7KsYhlOpBjGs4DvZ8y7siLOdt4BxY53BAV0wXilY9UC1OATtcb5ELWR54AgJqSGywSl0EE0hCDhqvavHGTD00QRD9FTVi"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: "{{PRICE_ID}}",
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.status(404).json({ success: false });
  }
}
