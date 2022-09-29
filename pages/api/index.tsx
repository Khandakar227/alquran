import type { NextApiRequest, NextApiResponse } from "next";
import Prisma, { getTranslation } from "@/libs/db";

const prisma = Prisma.getPrisma();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { endAt, startFrom, tr, surah_number, ayah_number } = req.query;
    const translation = getTranslation(tr?.toString() || 'en');

    if (!ayah_number) {
      const take =
        endAt && startFrom && +endAt - +startFrom + 1 > 0
          ? +endAt - +startFrom + 1
          : 20;

      const skip = startFrom && +startFrom - 1 >= 0 ? +startFrom - 1 : 0;

      const data = await prisma.ayahs.findMany({
        where: { surahNumber: +surah_number },
        take,
        skip,
        include: {
          wbw: {
            select: {
              ayah_wbw: true,
            },
          },
          ...translation,
        },
      });
      res.status(200).json(data);
      
    } else {
      const data = await prisma.ayahs.findFirst({
        where: {
          surahNumber: +surah_number,
          numberInSurah: +ayah_number,
        },
        include: {
          wbw: {
            select: {
              ayah_wbw: true,
            },
          },
          ...translation,
        },
      });

      res.status(200).json(data);
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
