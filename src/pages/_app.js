import { SessionProvider } from "next-auth/react"
import { CssVarsProvider } from '@mui/joy/styles';
import store from '@/stores/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
        <CssVarsProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </CssVarsProvider>
      </SessionProvider>
  )
}
