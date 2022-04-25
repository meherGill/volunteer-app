import type { NextApiRequest, NextApiResponse } from 'next'
import { PutItemCommand, GetItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb'

import { dynamodb } from '@lib/dynamo-db'

const TABLE_NAME = 'OrganizationAccount'

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

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email }: { email?: string } = req.query

  /**
   * if an email is provided, fetch an item/charity based on that email
   */
  if (email) {
    const getParams = {
      TableName: TABLE_NAME,
      Key: {
        email: {
          S: email,
        },
      },
    }

    const command = new GetItemCommand(getParams)

    try {
      const response = await dynamodb.send(command)

      if (!response.Item) {
        res.status(404).send('Organization user not found')
      }
      return res.status(response?.$metadata?.httpStatusCode!).json(response.Item)
    } catch (err) {
      return res.status(500).end(err)
    }
    /**
     * else fetch all charities
     */
  } else {
    const getParams = {
      TableName: TABLE_NAME,
    }
    try {
      const response = await dynamodb.send(new ScanCommand(getParams))

      if (!response.Items) {
        res.status(404).end('There are no organizations in the databas')
      }
      return res.status(response.$metadata.httpStatusCode! || 200).json(response.Items)
    } catch (err) {
      return res.status(500).end(err)
    }
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, type, password, phone, website } = req.body

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
  }

  const putNewUserItem = new PutItemCommand(putParams)

  try {
    const response = await dynamodb.send(putNewUserItem)
    return res
      .status(response?.$metadata?.httpStatusCode!)
      .end('Organiztion account successfully created')
  } catch (err) {
    console.log(err)
    console.log(putParams)
    return res.status(409).send(err)
  }
}
