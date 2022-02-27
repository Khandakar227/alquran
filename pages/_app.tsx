import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import Nprogress from 'nprogress';  //For showing a progress bar while navigating
import 'nprogress/nprogress.css'
import { useLocalStorageValue } from "@mantine/hooks";
import { TranslationProvider } from "@/libs/context";
import Router from "next/router"
import {useEffect} from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));


  useEffect(() => { //UseEffect hook required to make sure that this code does not run on the server
    Nprogress.configure({ minimum: 0.17 })
    Router.events.on('routeChangeStart', Nprogress.start) // Starts the progress bar
    Router.events.on('routeChangeError', Nprogress.done)  // Finishes the progress bar
    Router.events.on('routeChangeComplete', Nprogress.done) // Finishes the progress bar
  }, [])

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <TranslationProvider>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
        </TranslationProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
