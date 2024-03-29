import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
