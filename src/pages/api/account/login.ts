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
      const { email, password, isOrg } = req.body;

      if (!email || !password) {
        res.status(400).send("One or more fields are missing");
      }

      // to send back back to the frontend on what type user is logging in
      const accountType = isOrg ? "organization" : "volunteer";

      // set the table name based on the accountType
      const TABLE_NAME: TableName = isOrg
        ? "OrganizationAccount"
        : "VolunteerAccount";

      const postParams = {
        TableName: TABLE_NAME,
        Key: {
          email: {
            S: email,
          },
        },
      };
      const command = new GetItemCommand(postParams);

      try {
        const response = await dynamodb.send(command);

        if (!response.Item) {
          res.status(404).send(`${accountType} account does not exist`);
        }
        if (response.Item?.password?.S !== password) {
          res.status(401).send("Incorrect password");
        }

        const moddedData = {
          givenName: response.Item?.givenName?.S,
          lastName: response.Item?.lastName?.S,
          email: response.Item?.email?.S,
          phone: response.Item?.phone?.S,
          accountType: accountType,
        };

        res.status(200).json(moddedData);
      } catch (err) {
        res.status(500).send(err);
      }

      break;
    default:
      res.status(404).json({ success: false });
  }
}
