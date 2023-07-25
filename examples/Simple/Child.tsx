import React from "react";
import { useShard } from "../../src";
import { counterShard } from "./shard.constant";

const Child = () => {
  const [counter, setCounter] = useShard(counterShard);
  return (
    <div>
      <div data-testid="child">{counter}</div>
      <button
        data-testid="increase-from-child"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        +1
      </button>
    </div>
  );
};

export default Child;
