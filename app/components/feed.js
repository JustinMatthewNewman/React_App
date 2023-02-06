import React from 'react'
import Stories from './stories.js'
import Posts from './posts.js'
import MiniProfile from './miniprofile.js'
import Suggestions from './suggestions.js'

import { useSession } from "next-auth/react"

function feed() {
  const {data: session} = useSession();
  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/*Section*/}
            <section className="col-span-2"> 
                {/*Storys */}
                <Stories />
                {/*Posts */}
                <Posts />
            </section>
              {session && (
            <section className="hidden xl:inline-grid md:col-span-1">
              <div className="fixed top-20">
                {/*Mini Profile */}
                <MiniProfile />
                {/*Suggestions */}
                <Suggestions />
              </div> 
            </section>
              )}

    </main>

  )
}

export default feed
