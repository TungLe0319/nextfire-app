import Image from "next/image.js";
import React from "react";

export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <img src={user.photoURL} className="card-img-center shadow-lg" alt="user Image" />
      <p className="my-2">
        <i> @{user.username}</i>
      </p>
      <h1> {user.displayName}</h1>
    </div>
  );
}
