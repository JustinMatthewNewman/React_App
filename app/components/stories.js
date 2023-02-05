import { faker } from '@faker-js/faker';
import React from 'react'
import { useEffect, useState } from "react";
import Story from "./story.js";



function stories() {
    const [suggestions, setSuggestions] = useState([]);

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
    bg-white mt-8 border-gray-200 border 
    rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
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

export default stories
