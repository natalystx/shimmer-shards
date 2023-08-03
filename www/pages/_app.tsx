import React from "react";
import "./globals.css";
import { Kanit } from "next/font/google";
import Head from "next/head";

const kanit = Kanit({
  weight: ["300", "500", "600", "700"],
  subsets: ["thai", "latin"],
});

export default function CustomApp({ Component }: { Component: React.FC }) {
  return (
    <main className={kanit.className}>
      <Component />
    </main>
  );
}
