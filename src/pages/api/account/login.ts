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
<<<<<<< HEAD

      if (!email || !password) {
=======
      let accountType : string;
      if (!isOrg){
        accountType = "Volunteer"
      }
      else{
        accountType = "Org"
      }
      if (!email || !password || !accountType) {
>>>>>>> de866f7ab4e96cc87cf19a55599f401392e980c2
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
          res.status(405).send(`${accountType} account does not exist`);
        }
        if (response.Item?.password?.S !== password) {
          res.status(401).send("Incorrect password");
        }
<<<<<<< HEAD

        const moddedData = {
          givenName: response.Item?.givenName?.S,
          lastName: response.Item?.lastName?.S,
          email: response.Item?.email?.S,
          phone: response.Item?.phone?.S,
          accountType: accountType,
        };

        res.status(200).json(moddedData);
=======
        res.status(200).json(response.Item);
>>>>>>> de866f7ab4e96cc87cf19a55599f401392e980c2
      } catch (err) {
        res.status(500).send(err);
      }

      break;
    default:
      res.status(404).json({ success: false });
  }
}
