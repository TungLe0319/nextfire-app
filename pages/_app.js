import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context.js";
import NavBar from "../components/NavBar.js";
import "../styles/globals.css";

import { useUserData } from "../lib/hooks.js";
Toaster;

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider 
// @ts-ignore
    value={userData}>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
