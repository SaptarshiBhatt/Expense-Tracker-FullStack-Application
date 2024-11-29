import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Afacad } from "next/font/google";

const js = Afacad({ subsets: ["latin"], weight: "400" });

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <main className={js.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
