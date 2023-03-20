import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase.js";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "@firebase/firestore";
import MiniProfile from "./Miniprofile.js";
import Suggestions from "./Suggestions.js";
import HeaderImage from "./HeaderImage";
import { useRouter } from "next/router"


import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom.js";

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    let unsubscribe;
    if (session) {
      const userLikesRef = collection(db, "usersLikes", session.user.uid, "likes");
      unsubscribe = onSnapshot(userLikesRef, async (snapshot) => {
        let newLikes = [];
        for (const docChange of snapshot.docChanges()) {
          const {pid} = docChange.doc.data();
          if (docChange.type === "added") {
            const postRef = doc(db, "posts", pid);
            const postDoc = await getDoc(postRef);
            if (postDoc.exists()) {
              newLikes.push(postDoc);
            }
          } else if (docChange.type === "removed") {
            newLikes = newLikes.filter(post => post.id !== pid);
          }
        }
        setLikes(newLikes);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
    return () => unsubscribe && unsubscribe();
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/')
    return null
  }


  return (
    <div className="h-screen">
      <main
        className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
          !session && "!grid-cols-1 !max-w-3xl"
        }`}
      >

        {/*Section*/}
        <section className="col-span-2 mt-16 p-3">
          <div className="max-w-5xl mx-auto p-4">
            {/* <HeaderImage imageSource={"https://firebasestorage.googleapis.com/v0/b/cscode-61826.appspot.com/o/posts%2FFSEWrUNUFWZfb9ZoGcaM%2Fimage?alt=media&token=cd5728e3-0be0-40a4-817e-f9e7c2f1e729"}/> */}
            
            <div className="flex justify-between mt-8">
            <div className="xl:hidden md:col-span-1 flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-14 w-14 rounded-full p-[1.5px] border-purple-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
                  src={session?.user?.image}
                  alt="Profile Pic"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white dark:text-white">
                  @{session?.user?.username}
                </h1>
              </div>
            </div>

              <div className="text-center">
                
                <h2 className="font-bold text-lg text-white dark:text-white">
                  {likes.length}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Likes</p>
              </div>
              
              
            </div>
            <div
              className="p-2"
              style={{ borderBottom: "1px solid white" }}
            ></div>

            {likes.length > 0 && (
      <div className="grid grid-cols-3 gap-4 mt-8">
        {likes.map((like) => (
          <div key={like.id}>
            <img
                  className="w-full h-full object-cover"
                  src={like.data().image}
                  alt="Image 1"
                  onClick={() => router.push(`/singlePost?postid=${like.id}`)}

                />
          </div>
        ))}
      </div>
    )}
          </div>
        </section>
        {session && (
          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20">
              
              {/*Suggestions */}
              <Suggestions />
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Likes;
