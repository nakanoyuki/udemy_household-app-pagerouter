import type { AppProps } from "next/app";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme/theme";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
