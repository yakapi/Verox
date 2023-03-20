import MiseEnPage from '@/component/MiseEnPage'
import { UserContextProvider } from "../context/userContext"
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <MiseEnPage>
        <Component {...pageProps} />
      </MiseEnPage>
    </UserContextProvider>

  )
  
}
