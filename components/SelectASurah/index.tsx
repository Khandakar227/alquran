import { Box, Select } from "@mantine/core";
import MetaData from "@/public/metadata.json";
import { useRouter } from "next/router";
import { useEffect, DetailedHTMLProps, SelectHTMLAttributes } from "react";

export default function SelectASurah() {
  const router = useRouter();
  const surahs = MetaData.data.surahs.references;
  const { surah_number, ayah_number } = router.query;

  const ayah_numbers = Array(surahs[parseNum(surah_number) - 1].numberOfAyahs).fill(0).map((_, i) => `${i+1}`);

  function parseNum(text: any) {
    try {
      return parseInt(text) > 0 && parseInt(text) < 114 ? parseInt(text) : 1;
    } catch (error) {
      return 1;
    }
  }
  
  function changeSurah(e: string) {
      //console.log(e)
      router.push(`/${e}`)
  }
  function changeAyah (e: string) {
    router.push(`/${surahs[parseNum(surah_number) - 1].number}/${e}`)
  }
  
  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Select
      	value={surahs[parseNum(surah_number) - 1].number.toString()}
      	data={[
      	...surahs.map((surah)=>({
      	value: `${surah.number}`,
      	label: `${surah.englishName} (${surah.englishNameTranslation})`}
      	 )
      	)]}
      	searchable
      	placeholder="Select a surah"
      	label="Surah:"
      	aria-label="Surah:"
      	onChange={changeSurah}
      />
      
      <Select
      	data={ayah_numbers}
      	label="Ayah:"
      	placeholder="Select an ayah"
      	aria-label="Ayah:"
        onChange={changeAyah}
      />
    </Box>
    </>
  );
}

