import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head'

import Header from "../components/Header";
import HeaderImage from '../components/HeaderImage';
import Likes from '../components/Likes';
import Modal from "../components/Modal";



const LikesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();


const { uid } = router.query;
console.log(uid)

  return (
    <>
    <div className="bg-slate-800 h-scree overflow-y-scroll scrollbar-hide"> 
      <Head>
        <title>CSCODE.org</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Likes/>
      {/** Modal */}
      <Modal />
    </div>
    </>
  );
};

export default LikesPage;
