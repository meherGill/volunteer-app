import type { NextApiRequest, NextApiResponse } from "next";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const TABLE_NAME = "BusinessAccount";

  switch (req.method) {
    case "GET":
      const getParams = {
        TableName: TABLE_NAME,
        Key: {
          email: {
            S: "redcross@helpline.com",
          },
        },
      };

      const command = new GetItemCommand(getParams);

      try {
        const response = await dynamodb.send(command);

        if (!response.Item) {
          res.status(404).send("Business user not found");
        }
      } catch (err) {
        res.status(500).send(err);
      }
      break;

    case "POST":
      const { name, email, type, password, phone, website } = req.body;

      const putParams = {
        Item: {
          name: {
            S: name,
          },
          email: {
            S: email,
          },
          phone: {
            S: phone,
          },
          type: {
            S: type,
          },
          password: {
            S: password,
          },
          website: {
            S: website,
          },
        },
        TableName: TABLE_NAME,
      };

      const putNewUserItem = new PutItemCommand(putParams);

      try {
        const response = await dynamodb.send(putNewUserItem);
        res.status(201).send("Business user successfully created");
      } catch (err) {
        res.status(409).send(err);
      }
      break;
    default:
      res.status(404).json({ success: false });
  }
}
