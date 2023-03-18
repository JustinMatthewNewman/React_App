import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { db } from "../../firebase.js";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "@firebase/firestore";

const FollowButtons = ({uid, currentUserUid}) => {
  const {data: session} = useSession();

  const [follows, setFollows] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'userFollowers', uid, 'followers'), (snapshot) => {
      setFollows(snapshot.docs);
    });
    return () => {
      unsubscribe();
    }
  }, [db, uid]);

  useEffect(() => {

    const checkFollowing = async () => {
      try {
        const followingDocs = await getDocs(collection(db, 'userFollowers', currentUserUid, 'following'));
        const following = followingDocs.docs[0];
        setIsFollowing(following && following.data().uid === uid);

      } catch (e) {
        
      }
    };
  
    setIsFollowing(
      follows.findIndex((follow) => follow.data().uid === session?.user?.uid) !== -1
    );
    checkFollowing();
  }, [follows, uid, session, session?.user?.uid]);
  
  


  const Follow = async () => {
    const currentUserUid = session?.user?.uid;
    if (isFollowing) {
      const [follower] = follows.filter(follow => follow.data().uid === currentUserUid);
      const followingDocs = await getDocs(collection(db, 'userFollowers', currentUserUid, 'following'));
      const following = followingDocs.docs[0];
            await deleteDoc(follower.ref);
      try {
        await deleteDoc(following.docs[0].ref);

      } catch (e) {

      }
      setIsFollowing(false);
    } else {
      await setDoc (doc(db, 'userFollowers', uid, "followers", currentUserUid), {
        uid: currentUserUid,
      });
      await setDoc (doc(db, 'userFollowers', currentUserUid, "following", uid), {
        uid: uid,
      });
      setIsFollowing(true);
    }
  }


  return (
    <div className="flex space-x-4">
      <button
      onClick={Follow}
        className="bg-white text-gray-500 font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-100"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <button className="bg-white text-gray-500 font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-100">
        Message
      </button>
      <button
        className="bg-white text-gray-500 font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-100"
        onClick={() => window.open(`mailto:${session?.user?.email}`)}
      >
        Email
      </button>
    </div>
  );
};

export default FollowButtons;
