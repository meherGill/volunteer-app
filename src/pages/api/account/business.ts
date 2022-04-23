import type { NextApiRequest, NextApiResponse } from "next";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

const TABLE_NAME = "OrganizationAccount";

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
  const { email }: { email?: string } = req.query;

  if (email) {
    const getParams = {
      TableName: TABLE_NAME,
      Key: {
        email: {
          S: email,
        },
      },
    };

    const command = new GetItemCommand(getParams);

    try {
      const response = await dynamodb.send(command);

      if (!response.Item) {
        res.status(404).send("Organization user not found");
      }
      return res
        .status(response?.$metadata?.httpStatusCode!)
        .json(response.Item);
    } catch (err) {
      return res.status(500).end(err);
    }
  }
  res.status(400).send("Missing email field");
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
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
    return res
      .status(response?.$metadata?.httpStatusCode!)
      .end("Organiztion account successfully created");
  } catch (err) {
    console.log(err);
    console.log(putParams);
    return res.status(409).send(err);
  }
};
