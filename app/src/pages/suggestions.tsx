import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head'

import Header from "../components/Header";
import HeaderImage from '../components/HeaderImage';
import Suggestion from '../components/SuggestionsAll';
import Modal from "../components/Modal";


const Suggestions = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (!session) {
//     router.push("/login");
//   }

//   const user = session?.user;

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
      <main
        className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
          !session && "!grid-cols-1 !max-w-3xl"
        }`}>
                    <section className="col-span-2 mt-16 p-10">

      <Suggestion/>

                    </section>


        </main>


      <Header />
      
            {/** Modal */}
            <Modal />

    </div>
    </>
  );
};

export default Suggestions;