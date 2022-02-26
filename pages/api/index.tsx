import type { NextApiRequest, NextApiResponse } from "next";
import { getSheetData } from "@/libs/sheet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { endAt, startFrom, tr, surah_number, ayah_number } = req.query;
    let query = "";

    if (!ayah_number ) {
      query = `Select A, B, C, G, ${
        tr?.toString().toLowerCase() === "bn" ? "I" : "H"
      }, K
        Where C = ${+surah_number || 1} and B >= ${+startFrom || 1} and B <= ${
        endAt || +startFrom + 10 || 10
      }`;

    } else {
      query = `
      Select A,B,C,G, ${tr?.toString().toLowerCase() === "bn" ? "I" : "H"}, K
        Where C = ${+surah_number || 1} and
        B = ${+ayah_number}
      `;
    }

    const data = await getSheetData(query, {});
    res.json(data);
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
