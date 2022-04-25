import type { NextApiRequest, NextApiResponse } from 'next'
import {
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb'
import { v4 as uuidv4 } from 'uuid'

import { dynamodb } from '@lib/dynamo-db'

const TABLE_NAME = 'Campaign'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(resolve => {
    switch (req.method) {
      case 'GET':
        handleGetRequest(req, res)
        break

      case 'POST':
        handlePostRequest(req, res)
        break

      case 'DELETE':
        handleDeleteRequest(req, res)
        break

      default:
        res.status(404).json({ success: false })
    }

    return resolve
  })
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id }: { _id?: string } = req.query

  /**
   * if an _id is provided, fetch an item based on that email
   */
  if (_id) {
    const getParams = {
      TableName: TABLE_NAME,
      Key: {
        _id: {
          S: _id,
        },
      },
    }

    const command = new GetItemCommand(getParams)

    try {
      const response = await dynamodb.send(command)

      if (!response.Item) {
        return res.status(404).end(`Could not find campaign with id ${_id}`)
      }
      res.status(response?.$metadata?.httpStatusCode!).json(response.Item)
    } catch (err) {
      return res.status(500).end(err)
    }
    /**
     * else fetch all campaigns
     */
  } else {
    const getParams = {
      TableName: TABLE_NAME,
    }

    const command = new ScanCommand(getParams)

    try {
      const response = await dynamodb.send(command)

      if (!response.Items) {
        return res.status(404).end('No campagins available')
      }
      return res.status(response.$metadata.httpStatusCode!).json(response.Items)
    } catch (err) {
      return res.status(500).end(err)
    }
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, address, orgEmail, lat, lng } = req.body

  if (!title || !description || !address || !orgEmail) {
    res.status(400).send('One or more fields are missing')
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
            N: lat,
          },
          lng: {
            N: lng,
          },
        },
      },
    },
    TableName: TABLE_NAME,
  }

  try {
    const response = await dynamodb.send(new PutItemCommand(putParams))
    return res.status(response.$metadata.httpStatusCode!).end('Campaign created created')
  } catch (err) {
    // console.log(err);
    // console.log(putParams);
    // console.log(req.body);
    return res.status(409).end(err)
  }
}

const handleDeleteRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id }: { _id?: string } = req.query

  if (_id) {
    const params = {
      Key: {
        _id: {
          S: _id,
        },
      },
      TableName: TABLE_NAME,
    }

    /**
     * we'll first check if the item exists
     */
    try {
      const response = await dynamodb.send(new GetItemCommand(params))

      if (!response.Item) {
        return res.status(404).end(`No campagin record found with id ${_id}`)
      }
    } catch (err) {
      return res.status(409).end(err)
    }

    /**
     * If the item exists, we'll move on to deletion
     */
    try {
      const response = await dynamodb.send(new DeleteItemCommand(params))

      return res
        .status(response.$metadata.httpStatusCode! || 200)
        .end(`Campaign with ${_id} has been deleted successfully`)
    } catch (err) {
      return res.status(409).end(err)
    }
  }

  return res.status(400).send('Missing field _id')
}
