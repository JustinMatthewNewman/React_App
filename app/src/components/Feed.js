import React, { useEffect } from 'react';
import Stories from './Stories.js'
import Posts from './Posts.js'
import MiniProfile from './Miniprofile.js'
import Suggestions from './Suggestions.js'
import { addDoc, collection, serverTimestamp, getDocs, query, usersRef, where } from "@firebase/firestore"
import { db } from "../../firebase.js"
import { useSession } from "next-auth/react"
import { useState } from "react"

function Feed() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const logUser = async () => {
    if (loading || !session) return;
    setLoading(true);
  
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(query(usersRef, where("user_id", "==", session?.user?.uid)));
    
    if (!querySnapshot.empty) {
      console.log("User already exists in database");
      setLoading(false);
      return;
    }
  
    const docRef = await addDoc(usersRef, {
      username: session?.user?.username,
      profileImg: session?.user?.image,
      user_id: session?.user?.uid
    });
  
  
    setLoading(false);
  };
  
  useEffect(() => {
    logUser();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/*Section*/}
            <section className="col-span-2 mt-16"> 
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

export default Feed
