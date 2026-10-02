import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

// The web version's page shell (only used when the site is built, never in the phone apps)
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#0e1322" />
        <meta property="og:site_name" content="Alhan" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: 'body{background-color:#0e1322}@media (prefers-color-scheme: light){body{background-color:#f6f1e6}}' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
