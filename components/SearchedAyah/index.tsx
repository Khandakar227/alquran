import { useTranslation } from "@/libs/context";
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
        data.map((ayah: any) => (
          <Link key={ayah.ayah_number} href={`${ayah.surah_number}/${ayah.ayah_number_in_surah}?tr=${translation}`} passHref>
            <Paper mb="sm" shadow="sm" padding="sm" sx={{cursor: 'pointer'}}>
              {ayah.surah_number}. {ayah.ayah_number_in_surah}
              <Box lang="ar">
                <Highlight
                  sx={{ fontSize: "clamp(1.2rem, 6vw, 2rem)" }}
                  highlight={keyword}
                >
                  {ayah.ayahAR}
                </Highlight>
              </Box>
              <Highlight highlight={keyword}>
                {ayah?.ayahEN || ayah?.ayahBN}
              </Highlight>
            </Paper>
          </Link>
        ))}
    </>
  );
}
