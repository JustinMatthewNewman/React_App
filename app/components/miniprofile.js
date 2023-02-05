import React from 'react'

function miniprofile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img 
        className="w-16 h-16 rounded-full border p-[2px]" 
        src="http://44.211.91.72/img/justin.jpg" alt="justin" 
        />
        <div className="flex-1 mx-4">
          <h2 className="font-bold">  Hello, world! </h2>
          <h3 className="text-sm text-gray-400"> This is cool stuff. </h3>
        </div>
        <button>Sign out</button>
    </div>
  )
}

export default miniprofile
