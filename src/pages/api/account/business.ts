import type { NextApiRequest, NextApiResponse } from "next";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamodb } from "@lib/dynamo-db";

const TABLE_NAME = "OrganizationAccount";

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
        S: "redcross@helpline.com",
      },
    },
  };

  const command = new GetItemCommand(getParams);

  try {
    const response = await dynamodb.send(command);

    if (!response.Item) {
      res.status(404).send("Organization user not found");
    }
    res.status(response?.$metadata?.httpStatusCode!).json(response.Item);
  } catch (err) {
    res.status(500).send(err);
  }
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
    res
      .status(response?.$metadata?.httpStatusCode!)
      .send("Organiztion account successfully created");
  } catch (err) {
    res.status(409).send(err);
  }
};
