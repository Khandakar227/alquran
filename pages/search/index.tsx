import Error from "@/components/Error";
import { useSWRPrime } from "@/libs/index";
import { Container, Loader, Box, Title } from "@mantine/core";
import { useRouter } from "next/router";
import SearchedAyah from '@/components/SearchedAyah';

export default function Search() {
  const router = useRouter();
  const { keyword } = router.query;

  const { data, isLoading, isError } = useSWRPrime(getURL());

  function getURL() {
    const searchParams = new URLSearchParams({
      keyword: keyword?.toString() || "",
      lang: keyword?.toString().match(/[a-zA-Z0-9]/g) ? "en" : "bn",
    });

    return `/api/search?` + (searchParams && searchParams.toString());
  }

  if (!data && isError) return <Error error={isError} />;

  return (
    <>
      {!isLoading ? (
        <Container>
          {data && (
            <>
              <Title order={4}>
                Found {data.length} result{data.length > 1 ? "s" : ""} :
              </Title>
              <SearchedAyah data={data} keyword={keyword?.toString() || ''} />
            </>
          )}
        </Container>
      ) : (
        <Box sx={{ textAlign: "center", margin: "1rem auto" }}>
          <Loader arabicForm="medial" size="lg" color="red" />
        </Box>
      )}
    </>
  );
}
