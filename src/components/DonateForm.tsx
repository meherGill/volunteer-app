import { useState } from 'react'
import { useRouter } from 'next/router'

import getStripe from '@lib/get-stripe'
import { fetchPostJSON } from '@utils/api-helpers'

const DonateForm = () => {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(50)
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'one-off'>('monthly')
  const [organization, setOrganization] = useState('Red Cross')

  const router = useRouter()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    setLoading(true)

    const response = await fetchPostJSON('/api/donate', {
      amount: amount,
    })
    // Redirect to Checkout.
    const stripe = await getStripe()

    console.log(response)
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckot` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <div className="w-screen h-screen bg-orange-50">
      <div className="w-full h-16 bg-orange-200">
        <button
          className="h-full p-3 px-8 bg-orange-300"
          onClick={() => router.push('/VolunteerHome')}
        >
          BACK
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-md">
        <h4 className="mt-2 text-xl text-zinc-900 text-bold">Make donation to support a cause</h4>

        <div className="flex my-4">
          <button
            type="button"
            className={`${paymentPlan === 'monthly' ? 'bg-teal-400' : 'bg-gray-300'} w-24 h-8`}
            onClick={() => setPaymentPlan('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${paymentPlan === 'one-off' ? 'bg-teal-400' : 'bg-gray-300'} w-24 h-8`}
            onClick={() => setPaymentPlan('one-off')}
          >
            One-off
          </button>
        </div>

        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          {[30, 50, 100, 200, 300, 400].map(amt => (
            <button
              key={amt}
              type="button"
              className="rounded-md h-12 w-24 bg-gradient-to-tr from-[#628aae] to-[#ce9689] text-white"
              onClick={() => setAmount(amt)}
            >
              {'$' + amt}
            </button>
          ))}
        </div>

        <div className="flex mt-4 justify-between w-6/12">
          <span className="text-2xl">Or</span>
          <input
            type="number"
            className="w-32"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(parseInt(e.target.value))}
          />
        </div>

        <h1 className="mt-10 text-2xl text-gray-500 rounded-md">OR</h1>
        <h1 className="text-2xl text-gray-500 rounded-md">DONATE OTHER THINGS</h1>
        <textarea
          className="px-3 py-2 mt-10 w-4/5 rounded-md"
          placeholder="Write about what you are going to donate"
        ></textarea>
        <h1 className="mt-10 text-2xl text-gray-500 rounded-md">CHOOSE YOUR CHARITY</h1>
        <input
          type="text"
          onChange={e => setOrganization(e.target.value)}
          className="mt-5 px-3 py-2 rounded-md"
        />

        <button className="bg-orange-200 p-3 mt-10 rounded-lg" type="submit" disabled={loading}>
          Donate&nbsp;
          {`A$${amount <= 5 || isNaN(amount) ? 5 : amount} to ${organization}`}
        </button>
      </form>
    </div>
  )
}

export default DonateForm
