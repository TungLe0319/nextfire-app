import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className="">
      <div className=" text-red-600 font-bold text-sm mb-3">
        {post?.published == false? 'This Post Is Not Published ': ''}
      </div>
      <div className="bg-white p-5 rounded-xl shadow-lg  ">
        <span className="text-sm ">
          <h1 className="text-center  ">{post?.title}</h1>
          <Link href={`/${post.username}/`}>
            <p className="text-info">@{post.username}</p>
          </Link>
          {createdAt.toLocaleString()}
        </span>
        <div className="mt-5">
          <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
