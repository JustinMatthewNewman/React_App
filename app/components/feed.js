import React from 'react'
import Stories from './stories.js'
import Posts from './posts.js'

function feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
        <div> 
            {/*Section*/}
            <section className="col-span-2"> 
                {/*Storys */}
                <Stories />
                {/*Posts */}
                <Posts />

            </section>

            {/*Section*/}
            <section> 
                {/*Mini Profile */}
                {/*Suggestions */}
                
            </section>
        </div>
    </main>

  )
}

export default feed
