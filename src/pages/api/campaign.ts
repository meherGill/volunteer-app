import type { NextApiRequest, NextApiResponse } from "next";
import {
  PutItemCommand,
  ScanCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

import { dynamodb } from "@lib/dynamo-db";

const TABLE_NAME = "Campaign";

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

    case "DELETE":
      handleDeleteRequest(req, res);
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
    res.status(response.$metadata.httpStatusCode!).json(response.Items);
  } catch (err) {
    res.status(500).send(err);
  }
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, address, orgEmail, lat, lng } = req.body;

  if (!title || !description || !address || !orgEmail) {
    res.status(400).send("One or more fields are missing");
  }

  const putParams = {
    Item: {
      _id: {
        S: uuidv4(),
      },
      title: {
        S: title,
      },
      orgEmail: {
        S: orgEmail,
      },
      description: {
        S: description,
      },
      location: {
        M: {
          lat: {
            S: lat,
          },
          lng: {
            S: lng,
          },
        },
      },
    },
    TableName: TABLE_NAME,
  };

  const cmd = new PutItemCommand(putParams);

  try {
    const response = await dynamodb.send(cmd);
    res
      .status(response.$metadata.httpStatusCode!)
      .send("Campaign created created");
  } catch (err) {
    console.log(err);
    console.log(putParams);
    console.log(req.body);
    res.status(409).send(err);
  }
};

const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { _id } = req.query;

  if (_id) {
    const deleteItemByIdParams = {
      Key: {
        _id: {
          S: _id.toString(),
        },
      },
      TableName: TABLE_NAME,
    };

    const cmd = new DeleteItemCommand(deleteItemByIdParams);
    try {
      const response = await dynamodb.send(cmd);
      if (!response) {
        res.status(404).send(`No campagin record found with id ${_id}`);
      }
      // res.status(response.$metadata.httpStatusCode!).json(response);
    } catch (err) {
      res.status(409).send(err);
    }
  }
  res.status(400).send("Missing field _id");
};
