import Image from "next/image.js";
import React from "react";

export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <Image src={user.photoURL} className="card-img-center" alt="user Image" />
      <p>
        <i> @{user.username}</i>
      </p>
      <h1> {user.displayName}</h1>
    </div>
  );
}
