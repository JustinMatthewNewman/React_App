import { faker } from '@faker-js/faker';
import React from 'react'
import { useEffect, useState } from "react";
import Story from "./Story.js";

import { useSession } from "next-auth/react"



function Stories() {
    const [suggestions, setSuggestions] = useState([]);

    const {data: session} = useSession();

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            id: i,
            username: faker.internet.userName(),
            avatar: faker.image.avatar()
          }));
        setSuggestions(suggestions);
    }, []);
    return (

    <div className="flex space-x-2 p-6 
    bg-slate-900 mt-8 border 
    rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {suggestions.map(profile => (
        <Story 
        key={profile.id}
        img={profile.avatar}
        username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories
