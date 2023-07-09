import React from 'react'
import Post from './Post.js'
import { useState, useEffect } from 'react'
import { db, storage } from "../../firebase.js"
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { TailSpin } from  'react-loader-spinner'


function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => 
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
          setPosts(snapshot.docs);
          setIsLoading(false);
      }),
[db]);
console.log(posts)
if(isLoading) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
}

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
        user_id={post.data().user_id}
        />
      ))}
    </div>
  );
}

export default Posts
