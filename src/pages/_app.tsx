import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@/styles/issueCard.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}