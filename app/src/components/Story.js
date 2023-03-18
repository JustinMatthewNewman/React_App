import React from 'react'

function Story({img, username}) {
  return (
    <div>
        <img className="h-14 w-14 rounded-full p-[1.5px] border-white border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out" src={img} alt="img"/>
        <p className="text-xs w-14 truncate text-center text-gray-400">🟢{username}</p>
      
    </div>
  )
}

export default Story
