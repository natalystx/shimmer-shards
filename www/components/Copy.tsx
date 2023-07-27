"use client";

import React, { useState } from "react";
import { cx } from "@emotion/css";

type CopyProps = {
  copyText: string;
};

const Copy = ({ copyText }: CopyProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={cx(
        "mx-2 text-base active:text-[#E600B8] text-black transition-all text-inherit opacity-70 hover:opacity-100",
        copied && "!text-[#E600B8]"
      )}
      onClick={() => {
        setCopied(true);
        navigator.clipboard.writeText(copyText);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default Copy;
