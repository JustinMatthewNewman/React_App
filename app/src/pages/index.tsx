import Head from 'next/head'

import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";



import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className="bg-slate-800 h-scree overflow-y-scroll scrollbar-hide"> 
      <Head>
        <title>CSCODE.org</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      
      {/* Feed */}

      <Feed />
      {/** Modal */}
      <Modal />

    </div>
      
    </>
  )
}
