import PostFeed from "@components/PostFeed";
import Metatags from "@components/Metatags";
import Loader from "@components/Loader";
import { firestore, fromMillis, postToJSON } from "../lib/firebase.js";

import { useState } from "react";
import React from "react";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
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
      <Metatags
        title="Home Page"
        description="Get the latest posts on our site"
      />

      <div class="flex  justify-between logo">
        <img
          src={
            "https://seeklogo.com/images/N/next-js-logo-7929BCD36F-seeklogo.com.png"
          }
          alt="next.js logo"
          className=""
        />

        <img
          src={
            "https://images.ctfassets.net/s8f4sxdr4qh5/1o9AlnrXACcOTjOrWiqSn6/e2f948be10a60cee2189c4f79f0876ea/firebase-logo.png?w=464&q=90"
          }
          alt="firebase logo"
          className=""
        />
        <img
          src={
            "https://desarrolloweb.com/storage/tag_images/actual/cCKHt6xvfoqv00NHXqBK9meCatJHeaGW1SXmTisB.png"
          }
          alt="firebase logo"
          className=""
        />
      </div>


<hr class="border-t-2 border-gray-300 my-8 mx-auto  w-96"></hr>

      <div className="   mt-3 text-center">
        <p>loosely inspired by Dev.to.</p>
        <p>
          Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content
          created by other users.
          <br />
          All public content is server-rendered and search-engine optimized.
        </p>
      </div>

      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
