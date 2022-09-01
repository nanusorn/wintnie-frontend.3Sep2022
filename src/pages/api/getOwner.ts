// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from 'moralis'
// import FloorBidding from "../../../../wintnie-all-backup/wintnie-frontend-with-Moralis-Evm/src/config/abi/FloorBidding.json";
import FloorBidding from '../../config/abi/FloorBidding.json'

type Owner = {
  address: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Owner>) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  const response = await Moralis.EvmApi.native.runContractFunction({
    abi: FloorBidding,
    functionName: 'owner',
    address: '0xcABb5aE71383bc42ff642C323D94dB88eFd24D3C',
    chain: '0x61',
  })
  res.status(200).json({ address: response.result })
}
