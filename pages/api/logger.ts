import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
  ) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    console.log(req.body);
    res.status(200).send({message:'OK'})
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}