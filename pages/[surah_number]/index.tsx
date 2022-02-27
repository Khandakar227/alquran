import { GetServerSidePropsContext } from "next";
import MetaData from "@/public/metadata.json";
import { Container, Loader, Title, Box, Divider } from "@mantine/core";
import useSWR from "swr";
import { useLocalStorageValue } from "@mantine/hooks";
import { fetcher } from "@/libs/index";
import { useRouter } from "next/router";
import Error from "@/components/Error";
import Ayahs from "@/components/Ayahs";
import Head from "next/head";
import SelectASurah from "@/components/SelectASurah";
import { useTranslation } from "@/libs/context";
import AudioProvider from "@/libs/context/audio";

export default function Surah({
  surah,
  error,
}: {
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
  error: string;
}) {
  const router = useRouter();
  const [translation, _] = useTranslation();
  const { ayah, surah_number, tr } = router.query;

  const { data, error: swrError } = useSWR(getURL(), fetcher);

  console.log(data);

  function getURL() {
    const searchParams = new URLSearchParams({
      startFrom: ayah?.toString().split(":")[0] || "",
      endAt: ayah?.toString().split(":")[1] || "",
      surah_number: surah_number ? surah_number?.toString() : "1",
      tr: tr ? tr.toString() : translation.toString(),
    });

    return `/api?` + (searchParams && searchParams.toString());
  }

  if (!surah || error) return <Error error={error} />;

  return (
    <Container padding="md">
      <Head>
        <title>{`${surah.number}. ${surah.englishName} (${surah.name}) - Al Quran`}</title>
        <meta
          name="title"
          content={`${surah.number}. ${surah.englishName} (${surah.name}) - Al Quran`}
        />
        <meta name="description" content="A site for reading Quran." />
        <meta
          name="keywords"
          content={`Al Quran, ${surah.englishName}, chapter ${surah.number}`}
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <SelectASurah />

      <AudioProvider>
        <Title order={1} align="center" mt="lg" lang="ar">
          {surah.name}
        </Title>
        <Title order={2} mt="md" align="center">
          {surah.number}. {surah.englishName} ({surah.englishNameTranslation})
        </Title>
        <Divider my="md" />
        {data || swrError ? (
          <Ayahs data={data} surahDetail={surah} />
        ) : (
          <Box sx={{ textAlign: "center", margin: "1rem auto" }}>
            <Loader arabicForm="medial" size="lg" />
          </Box>
        )}
      </AudioProvider>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { surahs } = MetaData.data;
  try {
    //Get the surah number from params
    const surah_number = (ctx.params?.surah_number as string) || "";

    return {
      props: {
        surah: surahs.references[(+surah_number && +surah_number - 1) || 0],
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}
