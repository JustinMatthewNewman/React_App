import React from 'react'
import Post from './Post.js'
import { useState, useEffect } from 'react'
import { db, storage } from "../../firebase.js"
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"


function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => 
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
          setPosts(snapshot.docs);
      }),
[db]);

  return (
    <div>
      {posts.map((post) => (
        <Post 
        key={post.id}
        id={post.id}
        username={post.data().username}
        userimage={post.data().profileImg}
        media={post.data().image}
        caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts
