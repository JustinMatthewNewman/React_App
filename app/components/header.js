import React from 'react'
import Image from "next/image"

function header() {
  return (
    <div>

      <div className="flex justify-between max-w-6xl">

        {/*Left*/}
        <div className="relative hidden lg:inline-grid h24 w-24 cursor-pointer">
            <Image src="http://links.papareact.com/ocw" 
            layout="fill"
            objectFit="contain"
            />
        </div>

        <div className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer"> 
            <Image src="http://links.papareact.com/jjm" 
                layout="fill"
                objectFit="contain"
                />
        </div>


        <h1>Hello</h1>
        {/* Middle */}
        {/* Right */}

      </div>

    </div>
  )
}

export default header
