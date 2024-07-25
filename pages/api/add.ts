import { dbConnect } from "@/libs/db/mongodb";
import { add } from "data/add";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    try {
        // await dbConnect();
        // await add();  
        res.status(201).json({ success: true})      
    } catch (error) {
        console.log(error)
        res.status(500)
    }
  }