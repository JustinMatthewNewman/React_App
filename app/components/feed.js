import React from 'react'
import Stories from './stories.js'
import Posts from './posts.js'
import MiniProfile from './miniprofile.js'
import Suggestions from './suggestions.js'

function feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
            {/*Section*/}
            <section className="col-span-2"> 
                {/*Storys */}
                <Stories />
                {/*Posts */}
                <Posts />
            </section>
            {/*Section*/}
            <section className="hidden xl:inline-grid md:col-span-1">
              <div className="fixed top-20">
                {/*Mini Profile */}
                <MiniProfile />
                {/*Suggestions */}
                <Suggestions />
              </div> 
            </section>
    </main>

  )
}

export default feed
