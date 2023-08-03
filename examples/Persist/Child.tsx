import React from "react";
import { usePersistShard } from "../../src";
import { persistCountShard } from "./persist.shard";

const Child = () => {
  const [counter, setCounter] = usePersistShard(persistCountShard);
  return (
    <div>
      <div data-testid="persist-child">{counter}</div>
      <button
        data-testid="persist-increase-from-child"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        +1
      </button>
    </div>
  );
};

export default Child;
