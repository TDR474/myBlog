import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  globalStyles,
  ThemeProvider,
  Tooltip,
} from '@maximeheckel/design-system';
import { DefaultSeo } from '@core/components/Seo';
import { Analytics } from '@vercel/analytics/react';
import 'styles/global.css';
import 'styles/font.css';
import 'katex/dist/katex.min.css';
import Layout from 'core/components/Layout'; // Import your custom layout

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <ThemeProvider>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="google-site-verification" content="f11boUvGIzjbYwQVuaCieN-J4vcA_BxJuO_S54WPf-U" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
          integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
          crossOrigin="anonymous"
        />
      </Head>
      <DefaultSeo />
      <Tooltip.Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Tooltip.Provider>
      <Analytics />
    </ThemeProvider>
  );
};

export default App;