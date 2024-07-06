
import { getCssText } from '@maximeheckel/design-system';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="maximeheckel-light">
        <Head>

          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/inter-var-latin-italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/fira-code.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SpaceGrotesk-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SpaceGrotesk-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SpaceGrotesk-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* <link
            rel="preload"
            href="/fonts/tiempos-text-web-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/tiempos-text-web-semibold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/tiempos-text-web-semibold-italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/tiempos-text-web-regular-italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          /> */}
          <link
            href="/static/favicons/site-logo-f.png"
            rel="icon"
            sizes="16x16"
          />
          {/* <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/favicon-196x196.png"
            rel="icon"
            sizes="196x196"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-128x128.png"
            rel="icon"
            sizes="128x128"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-96x96.png"
            rel="icon"
            sizes="96x96"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          /> */}
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
          <link
            rel="webmention"
            href="https://webmention.io/blog.maximeheckel.com/webmention"
          />
          <link
            rel="pingback"
            href="https://webmention.io/blog.maximeheckel.com/xmlrpc"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
            integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
            crossOrigin="anonymous"
          /> 
          {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/themes/prism.min.css"
          /> */}
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <script 
            defer 
            src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js" 
            integrity="sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd" 
            crossOrigin="anonymous">
          </script>
          <script 
            defer 
            src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js" 
            integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" 
            crossOrigin="anonymous"></script>
          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-python.js"></script> */}

        </Head>
        <body>
          <Script src="public/sw.js"></Script>
          <script
            key="maximeheckel-theme"
            dangerouslySetInnerHTML={{
              __html: `(function() { try {
        var mode = localStorage.getItem('mode');
        var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
        if (!mode && supportDarkMode)  document.documentElement.classList.add('maximeheckel-dark');
        if (!mode) return
        document.documentElement.classList.add('maximeheckel-' + mode);
      } catch (e) {} })();`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
