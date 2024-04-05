import { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from '@mui/joy/styles';

export default function Document() {
  return (
    <Html lang="en" data-color-scheme="dark">
      <Head />
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
