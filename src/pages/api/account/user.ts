import type { NextApiRequest, NextApiResponse } from "next";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

const TABLE_NAME = "UserAccount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;

    case "POST":
      handlePostRequest(req, res);
      break;

    default:
      res.status(404).json({ success: false });
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
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

    res.status(200).json(response.Item);
  } catch (err) {
    res.status(500).send(err);
  }
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { givenName, lastName, email, phone, password } = req.body;

  const putParams = {
    Item: {
      givenName: {
        S: givenName,
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

  const command = new PutItemCommand(putParams);

  try {
    const response = await dynamodb.send(command);
    res.status(201).send("User successfully created");
  } catch (err) {
    res.status(409).send(err);
  }
};
