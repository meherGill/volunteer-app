/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51KhjQ7KsYhlOpBjGdEpalmpo9k6XobICJjoRz1Wjh3H3gtSbtZJTwTCTcCXDVdkUbU2Q7IFGCML6xH49HI3eslZo00xahWSwQn";
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
