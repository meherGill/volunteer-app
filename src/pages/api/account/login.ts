import type { NextApiRequest, NextApiResponse } from "next";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

type TableName = "VolunteerAccount" | "OrganizationAccount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { email, password, accountType } = req.body;

      if (!email || !password || !accountType) {
        res.status(400).send("One or more fields are missing");
      }

      // set the table name based on the accountType
      const TABLE_NAME: TableName =
        accountType === "Volunteer"
          ? "VolunteerAccount"
          : "OrganizationAccount";

      const postParams = {
        TableName: TABLE_NAME,
        Key: {
          email: {
            S: email,
          },
        },
        ProjectionExpression: "password",
      };
      const command = new GetItemCommand(postParams);

      try {
        const response = await dynamodb.send(command);

        if (!response.Item) {
          res.status(404).send(`${accountType} account does not exist`);
        }
        console.log(response.Item?.password?.S);
        if (response.Item?.password?.S !== password) {
          res.status(401).send("Incorrect password");
        }
        res.status(200).send("User verified successfully");
      } catch (err) {
        res.status(500).send(err);
      }

      break;
    default:
      res.status(404).json({ success: false });
  }
}
