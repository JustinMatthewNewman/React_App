import React from 'react'
import {useEffect, useState} from "react";
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';



function SuggestionsAll() {
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const suggestions = [...Array(35)].map((_, i) => ({
            id: i,
            username: faker.internet.userName(),
            company: faker.company.companyName(),
            avatar: faker.image.avatar()
          }));
        setSuggestions(suggestions);
    }, []);


    return (
    <div className="mt-4 ml-10">
        <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-bold text-gray-400">Suggestions for you.</h3>
            {/* <button    onClick={() => router.push("/suggestions")}
              className="text-gray-600 font-semibold">See All</button> */}
        </div>
        {suggestions.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between mt-3">
            <img className="w-10 h-10 rounded-full border-slate-300 p-[2px]" src={profile.avatar} alt="profile"/>
            <div className="flex-1 ml-4">
              <h2 className="text-sm font-semibold text-white">
                {profile.username}
              </h2>
              <h3 className="text-xs text-gray-400">
                Works at {profile.company}
              </h3>
            </div>
            {/* <button className="text-blue-400 text-xs font-bold cursor-pointer hover:scale-110 transition transform duration-200 ease-out">
                Follow
            </button> */}


            </div>
        ))}

    </div>
  )
}

export default SuggestionsAll
