import { SessionProvider } from "next-auth/react"
import store from '@/stores/store'
import { Provider } from 'react-redux'
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
    </SessionProvider>
)
}
