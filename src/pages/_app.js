import { SessionProvider } from "next-auth/react"
import { CssVarsProvider } from '@mui/joy/styles';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
        <CssVarsProvider>
            <Component {...pageProps} />
        </CssVarsProvider>
      </SessionProvider>
  )
}
