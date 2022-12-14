import React from "react";
import PostFeed from "../../components/PostFeed.js";
import UserProfile from "../../components/UserProfile.js";
import { getUserWithUsername, postToJSON } from "../../lib/firebase.js";

export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);
  let user = null;
  let posts = null;

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,  
    };
  }


  
  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
      posts = (await postsQuery.get()).docs.map(postToJSON)
  }
  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={true} />
    </main>
  );
}
