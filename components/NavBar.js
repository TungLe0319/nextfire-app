import { auth } from "@lib/firebase.js";
import Image from "next/image.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import React, { useContext,useState } from "react";
import { UserContext } from "../lib/context.js";

export default function Navbar() {
  // @ts-ignore
  const { user, username } = useContext(UserContext)
 
  const router = useRouter()
 const signOut = () => {
   auth.signOut();
   router.reload();
 };
  const handleImageError = () => {
    setImgUrl(
      "https://bestprofilepictures.com/wp-content/uploads/2020/06/Anonymous-Profile-Picture.jpg"
    );
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut} className="bg-transparent">
                Sign Out
              </button>
            </li>
            <li className="">
              <Link href="/admin">
                <button className=" transition-colors bg-transparent   hover:transition-colors">
                  Write Posts
                </button>
              </Link>


            </li>
            <li className="">
              <Link
                href={`/${username}`}
                className="flex align-middle  text-center"
              >
                <div className="">
                  {/* <img
                    src={
                      // @ts-ignore
                      user?.photoURL
                    }
                    alt="userImage"
                    width="80"
                    height="80"
                    onError={handleImageError}
                  /> */}
                </div>
                <p className="mb-0 mt-3 ml-2">@{user?.displayName}</p>
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}



export function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <div>
        <div className="fixed top-0 left-0 h-screen w-screen z-40 bg-black opacity-50"></div>
        <div
          className={`fixed top-96 left-0 h-screen w-screen z-50 overflow-y-auto ${
            isOpen ? "modal-open " : "  hidden"
          }`}
        >
          <div className="relative mx-auto my-0 max-w-lg">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-lg font-medium mb-4">Modal Title</h2>
              <p className="text-gray-700 mb-4">Modal content goes here</p>
              <button
                className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
                onClick={closeModal}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 ml-4"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
