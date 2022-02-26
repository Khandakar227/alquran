import type { NextApiRequest, NextApiResponse } from "next";
import { getSheetData } from "@/libs/sheet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { keyword, lang } = req.query;
    console.log(keyword);

    if (keyword.toString().trim()) {
      const query = `
        Select A, B, C, G,
        ${lang?.toString().toLowerCase() === "bn" ? "I" : "H"}, J
        Where LOWER(H) contains LOWER('${keyword}') or I contains '${keyword}' or J contains '${keyword}'
        `;

      const data = await getSheetData(query, {});

      res.json(data);
    } else res.status(400).send('Bad request');

  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

/*
   A=  ayah_number
   B = ayah_number_in_surah
   C= surah_number
   D = surah_nameEN
   E = surah_nameAR
   F = translated_surah_name
   G = page_number
   H = ayahEN
   I = ayahBN
   J = ayahAR
   K = ayah_wbw
*/
