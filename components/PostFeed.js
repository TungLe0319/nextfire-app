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

  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className="    shadow-inner p-5 rounded-md  my-3 bg-white hover:bg-indigo-200 hover:shadow-lg transition-all hover:transition-all">
        <span>
          <Link
            href={`/${post.username}`}
            className="text-info flex  w-fit rounded-xl  bg-slate-300 shadow-lg p-2 "
          >
            <img
              src={post.photoURL}
              alt="creator photo"
              className="shadow-xl rounded-full w-10 h-10"
            />{" "}
            <strong className=" text-sm ml-3"> @{post.username}</strong>
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
