import type { AppProps } from 'next/app'
import { WalletContextProvider } from '@mintbase-js/react'
import { Poppins } from '@next/font/google';
import '@/styles/globals.css'
import '@near-wallet-selector/modal-ui/styles.css';
import 'radix-declarative-form/rdf.css';

const poppins = Poppins({
  weight: '200',
  subsets: ['latin']
});

const poppinsBold = Poppins({
  weight: '900',
  subsets: ['latin']
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
          :root {
            --poppins: ${poppins.style.fontFamily};
            --poppins-bold: ${poppinsBold.style.fontFamily};
          }
        `}</style>

      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </>
  )
}
