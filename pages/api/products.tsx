import type { Product } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
  data?: Product[]
  msg?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.product.findMany({})
      return res.status(200).json({ data })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ msg: "Something went wrong" })
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" })
  }
}
