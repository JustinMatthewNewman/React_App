import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from "recoil"
import HashLoader from "react-spinners/HashLoader";

import React, {useState, useEffect, CSSProperties} from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    height: "1000px",
    width: "1000px",
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
       setLoading(false) 
    }, 2000)
  }, [])
  return (
    <div className="bg-slate-800 h-full w-full">

      {
        loading ?
  
        <HashLoader
          color={"#853ead"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
      <SessionProvider>
        <RecoilRoot>
  
        <Component {...pageProps} />
        </RecoilRoot>
  
      </SessionProvider>
      }
    </div>
  )
  
}
