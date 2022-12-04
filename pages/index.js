import Head from "next/head";
import Image from "next/image";
import Link from "next/link.js";
import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="">
      <Link prefetch={false} href={{
        pathname:'/[username]',
        query:{username: 'tung0319godhand'}
      }}>
    Tung Le
      </Link>
    </div>
  );
}
