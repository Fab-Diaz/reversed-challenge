import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@/styles/issueCard.css'
import '@/styles/issueHeader.css'
import '@/styles/issueFooter.css'
import '@/styles/form.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}