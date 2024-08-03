import Ayah from "@/libs/db/models/Ayah";
import { dbConnect } from "@/libs/db/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const { endAt, startFrom, tr, surah_number, ayah_number } = req.query;

        if (!surah_number) return res.status(401).json({ error: "No surah number specified." })

        await dbConnect();

        if (!ayah_number) {
            const limit =
                endAt && startFrom && +endAt - +startFrom + 1 > 0
                    ? +endAt - +startFrom + 1
                    : 20;

            const skip = startFrom && +startFrom - 1 >= 0 ? +startFrom - 1 : 0;
            const data = await Ayah.find({ surahNumber: +surah_number }).skip(skip).limit(limit).sort('number');
            res.status(200).json(data);

        } else {
            const data = await Ayah.findOne({ surahNumber: +surah_number, numberInSurah: +ayah_number })

            res.status(200).json(data);
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}  