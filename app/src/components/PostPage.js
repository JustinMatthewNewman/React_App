import React, { useState, useEffect } from "react";
import Post from "./Post.js";
import { db } from "../../firebase.js";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "@firebase/firestore";
import MiniPro from './Miniprofile.js';
import Sug from './Suggestions.js';


function PostsPage({ postid }) {
  const { data: session } = useSession();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (postid) {
        const postRef = doc(db, "posts", postid);
        const postDoc = await getDoc(postRef);
        setPost(postDoc.data());
      }
    };

    fetchPost();
  }, [db, postid]);

  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2 mt-16">
        {post && (
          <Post
            key={postid}
            id={postid}
            username={post.username}
            userimage={post.profileImg}
            media={post.image}
            caption={post.caption}
            user_id={post.user_id}
          />
        )}
      </section>
      {session && (
            <section className="hidden xl:inline-grid md:col-span-1">
              <div className="fixed top-20">
                {/*Mini Profile */}
                <MiniPro />
                {/*Suggestions */}
                <Sug />
              </div> 
            </section>
              )}
    </main>
  );
}

export default PostsPage;
