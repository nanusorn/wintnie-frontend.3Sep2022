import Moralis from 'moralis'
import { NextApiRequest, NextApiResponse } from 'next'
import { RequestMessageOptions } from '@moralisweb3/auth/lib/methods/requestMessage'

const config = {
  domain: process.env.APP_DOMAIN,
  statement: 'Please sign this message to confirm your identity.',
  uri: process.env.NEXTAUTH_URL,
  timeout: 60,
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, chain, network } = req.body
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })
  try {
    const message = await Moralis.Auth.requestMessage({
      address: address,
      chain: chain,
      network: network,
      ...config,
    })

    res.status(200).json(message)
  } catch (error) {
    res.status(400).json({ error })
    console.error(error)
  }
}

export default handler
