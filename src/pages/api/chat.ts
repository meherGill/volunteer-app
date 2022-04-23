import type { NextApiRequest, NextApiResponse } from "next";
import {
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

import { dynamodb } from "@lib/dynamo-db";

const TABLE_NAME = "Chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve) => {
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
    return resolve;
  });
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  type ChatQueryObj = {
    _id?: string;
    email1?: string;
    email2?: string;
  };

  const { _id, email1, email2 }: ChatQueryObj = req.query;

  if (!_id && !email1 && !email2) {
    res.status(400).send("No query parameters specified");
  }

  /**
    if the id is provided, we find the record based on the id
   */
  if (_id) {
    const getItemByIdParams = {
      TableName: TABLE_NAME,
      Key: {
        _id: {
          S: _id,
        },
      },
    };

    const command = new GetItemCommand(getItemByIdParams);

    try {
      const response = await dynamodb.send(command);

      if (!response.Item) {
        res.status(404).send(`No chat record found with id ${_id}`);
      }
      res.status(response.$metadata.httpStatusCode!).json(response.Item);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  /** 
    if both emails are provided, we find a record where the email might exist
    in either `email1` property or `email2` property
   */
  if (email1 && email2) {
    const getChatFromBothParams = {
      TableName: TABLE_NAME,
      FilterExpression:
        "#e1 = :email1 AND #e2 = :email2 OR #e1 = :email2 AND #e2 = :email1",
      ExpressionAttributeNames: {
        "#e1": "email1",
        "#e2": "email2",
      },
      ExpressionAttributeValues: {
        ":email1": { S: email1 as string },
        ":email2": { S: email2 as string },
      },
    };

    const command = new ScanCommand(getChatFromBothParams);

    try {
      const response = await dynamodb.send(command);

      if (!response.Items) {
        res.status(404).send("No chat records found");
      }
      res
        .status(response.$metadata.httpStatusCode!)
        .json(response.Items && response.Items[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  /* 
    if either email is provided, we find a record where  email might exist
    in either `email1` property or `email2` property
  */
 
  if (email1 || email2) {
    const emailToFind = email1 ?? email2;

    const getChatFromBothParams = {
      TableName: TABLE_NAME,
      FilterExpression: "#e1 = :email OR #e2 = :email",
      ExpressionAttributeNames: {
        "#e1": "email1",
        "#e2": "email2",
      },
      ExpressionAttributeValues: {
        ":email": { S: emailToFind as string },
      },
    };

    const command = new ScanCommand(getChatFromBothParams);

    try {
      const response = await dynamodb.send(command);

      if (!response.Items) {
        res.status(404).send("No chat records found");
      }
      res
        .status(response.$metadata.httpStatusCode!)
        .json(response.Items && response.Items[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email1, email2 } = req.body;

  if (!email1 || !email2) {
    res.status(400).send("One or more fields are missing");
  }

  const putParams = {
    Item: {
      _id: {
        S: uuidv4(),
      },
      email1: {
        S: email1,
      },
      email2: {
        S: email2,
      },
    },
    TableName: TABLE_NAME,
  };

  const cmd = new PutItemCommand(putParams);

  try {
    const response = await dynamodb.send(cmd);
    res
      .status(response.$metadata.httpStatusCode!)
      .send("Chat record created created");
  } catch (err) {
    res.status(409).send(err);
  }
};
