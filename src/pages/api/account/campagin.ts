import type { NextApiRequest, NextApiResponse } from "next";
import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

import { dynamodb } from "@lib/dynamo-db";

const TABLE_NAME = "CAMPAGIN";

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

const handleGetRequest = async (_: NextApiRequest, res: NextApiResponse) => {
  const getParams = {
    TableName: TABLE_NAME,
  };

  const command = new ScanCommand(getParams);

  try {
    const response = await dynamodb.send(command);

    if (!response.Items) {
      res.status(404).send("No campagins available");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, about, orgEmail } = req.body;

  const putParams = {
    Item: {
      _id: {
        S: uuidv4(),
      },
      orgEmail: {
        S: orgEmail,
      },
      tile: {
        S: title,
      },
      about: {
        S: about,
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
};
