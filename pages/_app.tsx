import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Criteria Centre</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
