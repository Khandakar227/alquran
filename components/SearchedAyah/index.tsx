import { useTranslation } from "@/libs/context";
import { Ayah } from "@/libs/types";
import { Highlight, Paper, Box } from "@mantine/core";
import Link from "next/link";

export default function SearchedAyah({
  data = [],
  keyword,
}: {
  data: any;
  keyword: string;
}) {
    const [ translation, _ ] = useTranslation()
    
  return (
    <>
      {data.length &&
        data.map((ayah: Ayah) => (
          <Link key={ayah.number} href={`${ayah.surahNumber}/${ayah.numberInSurah}?tr=${translation}`} passHref>
            <Paper mb="sm" shadow="sm" padding="sm" sx={{cursor: 'pointer'}}>
              {ayah.surahNumber}. {ayah.numberInSurah}
              <Box lang="ar">
                <Highlight
                  sx={{ fontSize: "clamp(1.2rem, 6vw, 2rem)" }}
                  highlight={keyword}
                >
                  {ayah.text}
                </Highlight>
              </Box>
              <Highlight highlight={keyword}>
                {ayah?.bn_ayahs?.text || ayah?.en_ayahs?.text || ''}
              </Highlight>
            </Paper>
          </Link>
        ))}
    </>
  );
}
