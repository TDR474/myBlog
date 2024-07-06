const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      async () => (await import('remark-parse')),
      async () => (await import('remark-math')),
      async () => (await import('remark-rehype')),
    ],
    rehypePlugins: [
      async () => (await import('rehype-katex')),
      async () => (await import('rehype-stringify')),
    ],
    providerImportSource: '@mdx-js/react',
  },
});

module.exports = withBundleAnalyzer(
  withMDX({
    trailingSlash: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 't.co',
          pathname: '**',
        },
      ],
    },
    webpack(config, { isServer, buildId }) {
      const reactPaths = {
        react: path.join(__dirname, 'node_modules/react'),
        'react-dom': path.join(__dirname, 'node_modules/react-dom'),
      };

      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...reactPaths,
        },
      };

      return config;
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
        {
          source: '/fonts/inter-var-latin.woff2',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/fonts/inter-var-latin-italic.woff2',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/fonts/fira-code.woff2',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/fonts/SpaceGrotesk-Medium.woff2',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/fonts/SpaceGrotesk-Regular.woff2',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/fonts/SpaceGrotesk-SemiBold.woff2',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  })
);

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com https://cdn.jsdelivr.net https://cdn.vercel-insights.com/ https://cdnjs.cloudflare.com https://www.googletagmanager.com; 
    child-src *.youtube.com *.google.com *.twitter.com *.codesandbox.io;
    style-src 'self' 'unsafe-inline' *.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com/;
    img-src * blob: data:;
    media-src 'self' d2xl4m2ghaywko.cloudfront.net https://video.twimg.com;
    connect-src *;
    font-src 'self' https://cdn.jsdelivr.net db.onlinewebfonts.com;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  // {
  //   key: 'X-Content-Type-Options',
  //   // allow
  //   value: 'nosniff',
  // },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
