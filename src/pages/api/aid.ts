import type { NextApiRequest, NextApiResponse } from 'next'
import { PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { v4 as uuidv4 } from 'uuid'

import { dynamodb } from '@lib/dynamo-db'

const TABLE_NAME = 'AidRequest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(resolve => {
    switch (req.method) {
      case 'GET':
        handleGetRequest(req, res)
        break

      case 'POST':
        handlePostRequest(req, res)
        break

      default:
        res.status(404).json({ success: false })
    }
    return resolve
  })
}

const handleGetRequest = async (_: NextApiRequest, res: NextApiResponse) => {
  const getParams = {
    TableName: TABLE_NAME,
  }

  const command = new ScanCommand(getParams)

  try {
    const response = await dynamodb.send(command)

    if (!response.Items) {
      res.status(404).end('No requests for aid at the moment')
    }
    return res.status(response.$metadata.httpStatusCode! || 200).json(response.Items)
  } catch (err) {
    return res.status(500).end(err)
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, address, description } = req.body

  if (!email || !address || !description) {
    res.status(400).send('One or more fields are missing')
  }

  const putParams = {
    Item: {
      _id: {
        S: uuidv4(),
      },
      email: {
        S: email,
      },
      // TODO: verify the address
      address: {
        M: {
          lat: {
            S: address.lat,
          },
          lng: {
            S: address.lng,
          },
        },
      },
      description: {
        S: description,
      },
    },
    TableName: TABLE_NAME,
  }

  const cmd = new PutItemCommand(putParams)

  try {
    const response = await dynamodb.send(cmd)
    return res
      .status(response.$metadata.httpStatusCode! || 200)
      .end('Aid request created successfully')
  } catch (err) {
    return res.status(409).end(err)
  }
}
