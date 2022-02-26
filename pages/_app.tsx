import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { TranslationProvider } from "@/libs/context";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
