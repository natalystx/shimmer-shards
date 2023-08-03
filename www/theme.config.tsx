import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import icon from "@/pages/favicon.ico";
import logo from "../assets/v2.png";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: (
    <div style={{ width: 200 }}>
      <img src={logo.src} alt="shimmer-shards-logo" />
    </div>
  ),
  head: () => {
    return (
      <>
        <link rel="icon" type="image/x-icon" href={icon.src} />
        <meta name="title" content="shimmershards" />
        <meta
          name="description"
          content="ShimmerShards - A Reactive React State Management Library"
        />
        <meta
          name="keywords"
          content="npm ,typescrip,t state-management, reactjs, nextjs, npm-package, mobx-react recoil, jotai, atomic-state, shimmershards"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="language" content="Thai" />
        <meta name="revisit-after" content="7 days" />
        <meta property="og:url" content="https://www.shimmershards.dev/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ShimmerShards - A Reactive React State Management Library"
        />
        <meta
          property="og:description"
          content="ShimmerShards is a simple-to-use React state management solution, reduces unnecessary updates and lets you focus on creating an awesome developer experience."
        />
        <meta
          property="og:image"
          content="https://www.shimmershards.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fv2_4x.b4a63739.png&w=3840&q=75"
        />
      </>
    );
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – ShimmerShards",
      };
    } else {
      return {
        titleTemplate: "ShimmerShards",
      };
    }
  },
  logoLink: "/",
  editLink: {
    component: ({ filePath, children, className }) => (
      <a
        className={className}
        href={`https://github.com/natalystx/shimmer-shards/blob/main/www/${filePath}`}
      >
        {children}
      </a>
    ),
  },
  search: {
    placeholder: "Search",
    error: "No results",
  },
  primaryHue: 312,
  i18n: [
    { locale: "en", text: "English" },
    { locale: "th", text: "ไทย" },
  ],
  project: {
    link: "https://github.com/natalystx/shimmer-shards",
  },
  docsRepositoryBase: "https://github.com/natalystx/shimmer-shards",
  footer: {
    text: `© ${new Date(Date.now()).getFullYear()} ShimmerShards`,
  },
};

export default config;
