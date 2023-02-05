import React from 'react'
import Post from './post.js'

const posts_list = [
    {
        id: '123',
        username: 'lib',
        userimage: 'http://44.211.91.72/img/libby.jpg',
        media: 'http://44.211.91.72/img/libby.jpg',
        caption: 'justin is sexy',
    },
    {
        id: '124',
        username: 'justin',
        userimage: 'http://44.211.91.72/img/justin.jpg',
        media: 'http://44.211.91.72/img/justin.jpg',
        caption: 'cool it works',
    },
];

function posts() {
  return (
    <div>
      {posts_list.map((post) => (
        <Post 
        key={post.id}
        id={post.id}
        username={post.username}
        userimage={post.userimage}
        media={post.media}
        caption={post.caption}
        />
      ))}
    </div>
  );
}

export default posts
