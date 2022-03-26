import Ably from "ably/promises";

const ABLY_API_KEY = "K6CVaQ.Fu8LqQ:8ZsZF2EUTtJgO_DPJiFkOecJv47S9E_QA-1OcGhqq0s"
export default async function handler(req :any, res: any) {

    const client = new Ably.Realtime(ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
    res.status(200).json(tokenRequestData);
};