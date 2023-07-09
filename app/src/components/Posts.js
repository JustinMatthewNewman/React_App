import React, { useState, useEffect, useRef } from 'react';
import Post from './Post.js';
import { db } from '../../firebase.js';
import { collection, query, orderBy, limit, startAfter, onSnapshot } from '@firebase/firestore';

import { TailSpin } from 'react-loader-spinner';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(2));
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const newPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setPosts(newPosts);
        setLastPost(lastVisible);
        setLoading(false);
      });

      return () => {
        snapshot();
      };
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMorePosts();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    if (observerRef.current) {
      observerRef.current.observe(document.getElementById('observer'));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [posts]);

  const loadMorePosts = async () => {
    if (lastPost) {
      setLoading(true);
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), startAfter(lastPost), limit(2));
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const newPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLastPost(lastVisible);
        setLoading(false);
      });

      return () => {
        snapshot();
      };
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userimage={post.profileImg}
          media={post.image}
          caption={post.caption}
          user_id={post.user_id}
        />
      ))}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '128px' }}>
          <TailSpin
            height={80}
            width={80}
            color="#FFF"
            ariaLabel="TailSpin-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      <div id="observer"></div>
    </div>
  );
}

export default Posts;
