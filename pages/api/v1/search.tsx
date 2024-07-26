import type { NextApiRequest, NextApiResponse } from "next";
import Ayah from "@/libs/db/models/Ayah";
import { dbConnect } from "@/libs/db/mongodb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { keyword, lang } = req.query;
    if(keyword === undefined) return res.status(400).json({error: "No keyword specified."});

    await dbConnect();

    if (keyword.toString().trim()) {
      const data = await Ayah.find({ $text: { $search: keyword.toString() } }).select('-wbw');
      res.status(200).json(data);
    } else res.status(400).send("Bad request");
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}


export const config ={
    api: {
        responseLimit: false
    }
}
