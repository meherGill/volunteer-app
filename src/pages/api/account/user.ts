import type { NextApiRequest, NextApiResponse } from "next";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const TABLE_NAME = "UserAccount";

  switch (req.method) {
    case "GET":
      const getParams = {
        TableName: TABLE_NAME,
        Key: {
          email: {
            S: "johndoe@email.com",
          },
        },
      };

      const command = new GetItemCommand(getParams);

      try {
        const response = await dynamodb.send(command);

        if (!response.Item) {
          res.status(404).send("User not found");
        }
      } catch (err) {
        res.status(500).send(err);
      }
      break;

    case "POST":
      const { firstName, lastName, email, phone, password } = req.body;

      const putParams = {
        Item: {
          firstName: {
            S: firstName,
          },
          lastName: {
            S: lastName,
          },
          email: {
            S: email,
          },
          phone: {
            S: phone,
          },
          password: {
            S: password,
          },
        },
        TableName: TABLE_NAME,
      };

      const putNewUserItem = new PutItemCommand(putParams);

      try {
        const response = await dynamodb.send(putNewUserItem);
        res.status(201).send("User successfully created");
      } catch (err) {
        res.status(409).send(err);
      }
      break;
    default:
      res.status(404).json({ success: false });
  }
}
