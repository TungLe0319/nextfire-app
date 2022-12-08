import Head from "next/head";
import Image from "next/image";
import Link from "next/link.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader.js";
import PostFeed from "../components/PostFeed.js";

import { firestore, postToJSON,fromMillis } from "../lib/firebase.js";
const LIMIT = 1;
export async function getServerSideProps(context) {
  const postQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);
  const posts = (await postQuery.get()).docs.map(postToJSON);
  return {
    props: {
      posts,
    },
  };
}
export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

  
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAT", "desc")
      .startAfter(cursor)
      .limit(LIMIT);
    const newPosts = (await query.get()).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <main>
      <PostFeed posts={posts} admin={false} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load More</button>
      )}
      <Loader show={loading} />
      {postsEnd && "You have reached the end!"}
    </main>
  );
}

