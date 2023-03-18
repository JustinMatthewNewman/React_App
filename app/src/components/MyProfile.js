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
} from "@firebase/firestore";
import MiniProfile from "./Miniprofile.js";
import Suggestions from "./Suggestions.js";
import Buttons from "./FollowButtons";
import HeaderImage from "./HeaderImage";
import { useRouter } from "next/router"


import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom.js";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    let unsubscribe;
    if (session) {
      const q = query(
        collection(db, "posts"),
        where("user_id", "==", session?.user?.uid),
        orderBy("timestamp", "desc")
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs);
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
        {session && (
          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20">
              {/*Mini Profile */}
              <MiniProfile />
              <div className="flex justify-center p-5">
              <Buttons uid={session?.user?.uid} currentUserUid={session?.user?.uid} />
                
              </div>
              {/*Suggestions */}
              <Suggestions />
            </div>
          </section>
        )}

        {/*Section*/}
        <section className="col-span-2 mt-16">
          <div className="max-w-5xl mx-auto p-4">
            {/* <HeaderImage imageSource={"https://firebasestorage.googleapis.com/v0/b/cscode-61826.appspot.com/o/posts%2FFSEWrUNUFWZfb9ZoGcaM%2Fimage?alt=media&token=cd5728e3-0be0-40a4-817e-f9e7c2f1e729"}/> */}
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
            <div className="xl:hidden flex flex-col p-3">
              <div className="flex justify-between mt-8">
              <Buttons uid={session?.user?.uid} currentUserUid={session?.user?.uid} />
              <button onClick={signOut} className="text-blue-400 text-sm font-semibold cursor-pointer hover:scale-110 transition transform duration-200 ease-out">Sign out</button>

              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="text-center">
                <h2 className="font-bold text-lg text-white dark:text-white">
                  {posts.length}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <h2 className="font-bold text-lg text-white dark:text-white">
                  10.3M
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <h2 className="font-bold text-lg text-white dark:text-white">
                  0
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Following</p>
              </div>
            </div>
            <div
              className="p-2"
              style={{ borderBottom: "1px solid white" }}
            ></div>

            <div className="grid grid-cols-3 gap-4 mt-8">
            {posts.map((post) => (
                  <div key={post.id}>
                <img
                  className="w-full h-full object-cover"
                  src={post.data().image}
                  alt="Image 1"
                />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyProfile;
