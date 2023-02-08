import React from 'react'
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from '../../../components/Header.js'

function signIn( { providers }: { providers: Object } ) {
  return (
    <>
    <div className="h-100 bg-white">

    <Header />
    <div className="flex flex-col items-center h-100 justify-center mt-10 py-20 ">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/"})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}

    </div>
    </div>
    </>
  )
}

// Server side render
export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers,
        },
    };
}

export default signIn;
