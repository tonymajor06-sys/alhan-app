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
        <meta name="theme-color" content="#1a0a0e" />
        <meta property="og:site_name" content="Coptic Psalmody" />
        {/* Google AdSense (same publisher as the app's AdMob): verifies the site, and shows Auto ads once approved */}
        <meta name="google-adsense-account" content="ca-pub-8657918561342604" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8657918561342604" crossOrigin="anonymous" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: 'body{background-color:#1a0a0e}@media (prefers-color-scheme: light){body{background-color:#f4e8d2}}' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
