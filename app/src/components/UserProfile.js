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
  getDocs
} from "@firebase/firestore";
import MiniProfile from "./Miniprofile.js";
import Suggestions from "./Suggestions.js";
import Buttons from "./FollowButtons";
import HeaderImage from "./HeaderImage";
import { useRouter } from "next/router"

import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom.js";

const UserProfile = ( ) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);  const { data: session } = useSession();
  const router = useRouter();

  const [follows, setFollows] = useState([]);
  const [isFollowing, setHasFollowed] = useState(false);

  const { uid } = router.query;


useEffect(() => {
    const getUser = async () => {
        let unsubscribe;

      if (uid) {
        const q = query(collection(db, "users"), where("user_id", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUser(userDoc.data());
        }
        const qu = query(
            collection(db, "posts"),
            where("user_id", "==", uid),
            orderBy("timestamp", "desc")
          );
          unsubscribe = onSnapshot(qu, (snapshot) => {
            setPosts(snapshot.docs);
            setIsLoading(false);
          });
            setIsLoading(false);
      }
    };
    getUser();
  }, [uid]);


  useEffect(() => {
    const getUserFollowers = async () => {
      if (uid) {
        const followersQuery = query(
          collection(db, "userFollowers", uid, "followers")
        );
        const followingQuery = query(
          collection(db, "userFollowers", uid, "following")
        );

  
        const unsubscribeFollowers = onSnapshot(followersQuery, (snapshot) => {
          const count = snapshot.docs.length;
          console.log(count)
          setFollowersCount(count);
        });
  
        const unsubscribeFollowing = onSnapshot(followingQuery, (snapshot) => {
          const count = snapshot.docs.length;
          console.log(count)

          setFollowingCount(count);
        });
  
        return () => {
          unsubscribeFollowers();
          unsubscribeFollowing();
        };
      }
    };
  
    getUserFollowers();
  }, [uid]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="h-screen">

        {/*Section*/}
        <section className="col-span-2 mt-16">
          <div className="max-w-5xl mx-auto p-4">
            {/* <HeaderImage imageSource={"https://firebasestorage.googleapis.com/v0/b/cscode-61826.appspot.com/o/posts%2FFSEWrUNUFWZfb9ZoGcaM%2Fimage?alt=media&token=cd5728e3-0be0-40a4-817e-f9e7c2f1e729"}/> */}
            <div className="md:col-span-1 flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-14 w-14 rounded-full p-[1.5px] border-purple-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
                  src={user?.profileImg}
                  alt="Profile Pic"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white dark:text-white">
                  @{user?.username}
                </h1>

              </div>
            </div>
              <div className="flex flex-col p-3">
              <Buttons uid={uid} currentUserId={session?.user?.uid} />
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
                  {followersCount}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <h2 className="font-bold text-lg text-white dark:text-white">
                  {followingCount}
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
                    {console.log(post.data())}
                <img
                  className="w-full h-full object-cover"
                  src={post.data().image}
                  alt="Image 1"
                  onClick={() => router.push(`/singlePost?postid=${post.id}`)}

                />
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  );
};

export default UserProfile;
