import type { NextPage } from "next";
import MetaData from "@/public/metadata.json";
import { Grid, Paper, Title } from "@mantine/core";
import Link from "next/link";

const Home: NextPage = () => {
  const { surahs } = MetaData.data;

  return (
    <div>
    <Grid>
      {
        surahs.references.map((surah) => (
          <Grid.Col md={4} sm={6} lg={4} key={surah.name}>
            <Link href={`/${surah.number}`}>
              <a>
              <Paper mb="md" shadow="sm" padding="md" sx={{textAlign: 'center'}}>
                <Title order={2}> <small>{surah.number}</small>. <span lang="ar">{surah.name}</span> </Title>
                <Title order={4}> {surah.englishName} ({surah.englishNameTranslation})</Title>
                <small> {surah.revelationType} </small>
              </Paper>
              </a>
            </Link>
          </Grid.Col>
        ))
      }
    </Grid>
    </div>
  );
};

export default Home;
