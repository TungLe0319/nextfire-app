import Link from "next/link";
import React from "react";
import Image from "next/image.js";
export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content?.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  console.log(post?.createdAt);
  const date = timeAgo(post?.createdAt);

  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className=" rainbow-border    shadow-inner p-5 rounded-md  my-3 bg-white  transition-all hover:transition-all">
        <span>
          <Link
            href={`/${post.username}`}
            className=" flex  w-fit  rounded-lg shadow-lg p-2 "
          >
            <img
              src={post.photoURL}
              alt="creator photo"
              className="shadow-xl rounded-full w-10 h-10"
            />{" "}
            <div class="flex flex-col ml-3">
              <small className=" text-info"> @{post.username}</small>
              <small> {date} </small>
            </div>
          </Link>
        </span>

        <div className=" my-5">
          <Link href={`/${post.username}/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
        <footer className="flex">
          <span className="   text-sm">
            {wordCount} words. {minutesToRead} min read
          </span>
          <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
        </footer>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <h3>
                <button className="btn-blue">Edit</button>
              </h3>
            </Link>

            {post.published ? (
              <p className="text-success">Live</p>
            ) : (
              <p className="text-danger">Unpublished</p>
            )}
          </>
        )}
      </div>
    </Link>
  );
}

function timeAgo(timestamp) {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
