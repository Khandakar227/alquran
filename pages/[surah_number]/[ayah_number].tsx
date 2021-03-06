import { Container, Title, Divider } from "@mantine/core";
import { GetServerSidePropsContext } from "next/types";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import MetaData from "@/public/metadata.json";
import { Ayah, Surah } from "@/libs/types";
import Error from "@/components/Error";
import SEO from "@/components/SEO";
import Ayahs from "@/components/Ayahs";
import AudioProvider from "@/libs/context/audio";

export default function AyahInSurah({
  data,
  surah,
}: {
  data: Ayah[];
  surah: Surah;
}) {
  if (!surah || !data.length) return <Error />;
  return (
    <Container>
       <SEO title={`${surah.number}: ${data[0].ayah_number_in_surah} - Al Quran`} description={data[0].ayahEN} />
      <AudioProvider>
        <Title order={1} align="center" mt="lg" lang="ar">
          {surah.name}
        </Title>
        <Title order={2} mt="md" align="center">
          {surah.number}. {surah.englishName} ({surah.englishNameTranslation})
        </Title>
        <Divider my="md" />
        <Ayahs data={data} surahDetail={surah} />
      </AudioProvider>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const { surahs } = MetaData.data;
    const surah_number = (ctx.params?.surah_number as string) || "";
    const ayah_number = (ctx.params?.ayah_number as string) || "";
    const tr = (ctx.query?.tr as string) || "";

    const { origin } = absoluteURL(ctx.req);

    const { data } = await axios.get(
      `${origin}/api?surah_number=${surah_number}&ayah_number=${ayah_number}&tr=${tr}`
    );

    // console.log(surah_number, ayah_number, data);

    return {
      props: {
        data,
        surah_number,
        surah: surahs.references[(+surah_number && +surah_number - 1) || 0],
      },
    };
  } catch (error) {
    console.log(error);
  }
}
