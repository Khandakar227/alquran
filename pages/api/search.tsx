import type { NextApiRequest, NextApiResponse } from "next";
import Prisma, { getTranslation } from "@/libs/db";

const prisma = Prisma.getPrisma();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { keyword, lang } = req.query;
    const translation = getTranslation(lang?.toString() || "en");
    if (keyword.toString().trim()) {
      const data = await prisma.ayahs.findMany({
        where: {
          OR: [
            { ...searchFromTr(lang?.toString() || "en", keyword) },
            { text: { contains: keyword.toString() } },
          ],
        },
        include: {
          // wbw: {
          //   select: {
          //     ayah_wbw: true,
          //   },
          // },
          ...translation,
        },
      });

      res.status(200).json(data);
    } else res.status(400).send("Bad request");
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

function searchFromTr(lang: string, keyword: any) {
  if (lang == "bn")
    return { bn_ayahs: { text: { contains: keyword.toString() } } };
  else return { en_ayahs: { text: { contains: keyword.toString() } } };
}
