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
    // { locale: "th", text: "ไทย" },
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
