import type { NextApiRequest, NextApiResponse } from "next";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    /**
      {
        email,
        pasword,
        accountType
      }
      */
  }
}
