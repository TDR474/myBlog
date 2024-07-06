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
// import { useEffect, useState } from 'react'; 

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <div suppressHydrationWarning>
    <ThemeProvider>
      <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DYS0CB5YDP"></script>

      <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-DYS0CB5YDP');
              `,
            }}
          />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="google-site-verification"
          content="f11boUvGIzjbYwQVuaCieN-J4vcA_BxJuO_S54WPf-U"
        />
      </Head>
      <DefaultSeo />
      <Tooltip.Provider>
        <Component {...pageProps} />
      </Tooltip.Provider>
      <Analytics />
    </ThemeProvider>
    </div>
  );
};
export default App;
