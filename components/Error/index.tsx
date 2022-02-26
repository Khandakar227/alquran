import { Container, Title } from "@mantine/core"
import Link from "next/link"

function Error({error, ...props}:{error?:any, props?: any}) {
  return (
    <>
        <Container my='lg'>
            <Title order={1} my='md'> 404 </Title>
            <Title order={2} my='md'> Not found. Something went wrong </Title>
            <Title order={4} my='md'>{typeof(error) === 'object' ? error.message : error}</Title>
            Go back  <u><b><Link href="/"> to main page </Link></b></u>
        </Container>
    </>
  )
}

export default Error