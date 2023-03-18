import React from 'react'

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";



function Miniprofile() {
  
  const { data: session } = useSession();
  const router = useRouter();

  
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img 
      onClick={() => router.push("/myProfile")}
        className="h-14 w-14 rounded-full p-[1.5px] border-purple-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out" 
        src={session?.user?.image} alt="justin" 
        />
        <div className="flex-1 mx-4">
          <h2 onClick={() => router.push("/myProfile")} className="text-white font-bold">@{session?.user?.username}</h2>
          <h3 className="text-sm text-gray-400"> Welcome to CS code </h3>
        </div>
        <button onClick={signOut} className="text-blue-400 text-sm font-semibold cursor-pointer hover:scale-110 transition transform duration-200 ease-out">Sign out</button>
    </div>
  )
}

export default Miniprofile
