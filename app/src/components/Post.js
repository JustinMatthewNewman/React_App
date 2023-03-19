import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import {
  getDoc,
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
  findIndex,
} from "@firebase/firestore";
import { signIn, useSession } from "next-auth/react";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import Moment from "react-moment";
import { useRouter } from "next/router";

import React from "react";

function Post({ id, username, userimage, media, caption, user_id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSignInClick = () => {
    try {
      signIn();
    } catch (error) {
      console.error(error);
      alert(
        "Sorry, a lot of people are signing in right now. Please try again in a couple seconds."
      );
      router.push("/");
    }
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", id));
    setShowModal(false);
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      await deleteDoc(doc(db, "usersLikes", session.user.uid, "likes", id));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
      await setDoc(doc(db, "usersLikes", session.user.uid, "likes", id), {
        pid: id,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
      uid: session.user.uid,
    });
  };
  return (
    <div className="bg-slate-900 my-7 rounded-lg text-gray-400">
      <div className="flex items-center p-5">
        {/* Header */}
        <img
          src={userimage}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
          onClick={() => router.push(`/userProfile?uid=${user_id}`)}
        />
        <p
          onClick={() => router.push(`/userProfile?uid=${user_id}`)}
          className="flex-1 font-bold"
        >
          {username}
        </p>

        <DotsHorizontalIcon
          className="h-5"
          onClick={async () => {
            // Check if current user is the author of the post
            if (session) {
              const postRef = doc(db, "posts", id);
              const postDoc = await getDoc(postRef);
              if (
                postDoc.exists() &&
                postDoc.data().user_id === session.user.uid
              ) {
                setShowModal(true);
              }
            }
          }}
        />
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Delete this post?</p>
              <button onClick={handleDelete}>OK</button>
              &nbsp;
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* media */}
      <div className="relative">
      <img
        onDoubleClick={likePost}
        src={media}
        className="object-cover w-full"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <HeartIconFilled
          className={`btn text-white heart-icon ${
            isAnimating ? 'animate-heart' : ''
          }`}
        />
      </div>
    </div>

      {/* button */}
      {session ? (
        <div className="flex justify-between px-4 pt-4 pb-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIconFilled onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            {/* <PaperAirplaneIcon className="btn" onClick={handleClick} /> */}
          </div>

          {/* <BookmarkIcon className="btn" /> */}
        </div>
      ) : (
        <div className="flex justify-between px-4 pt-4 pb-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={handleSignInClick}
                className="btn text-red-500 animate-like"
              />
            ) : (
              <HeartIconFilled onClick={handleSignInClick} className="btn" />
            )}
            <ChatIcon onClick={handleSignInClick} className="btn" />
            <PaperAirplaneIcon className="btn" onClick={handleSignInClick} />
          </div>

          {/* <BookmarkIcon className="btn" /> */}
        </div>
      )}

      {/* captions */}

      <p className="p-5 truncate">
        {likes.length > 0 && <p>{likes.length} likes</p>}
        <span
          onClick={() => router.push(`/userProfile?uid=${user_id}`)}
          className="font-bold mr-1"
        >
          {" "}
          {username}{" "}
        </span>{" "}
        {caption}{" "}
      </p>

      {/* comments  */}

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin text-gray-400">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p
                onClick={() =>
                  router.push(`/userProfile?uid=${comment.data().uid}`)
                }
              >
                <span className="font-bold text-white-400">
                  {comment.data().username}
                </span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-15 text-xs text-gray-400">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none bg-transparent"
            placeholder=" Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
