import React from "react";
import { usePersistShard } from "../../src";
import { persistCountShard } from "./persist.shard";
import Child from "./Child";

const Persist = () => {
  const [counter, setCounter] = usePersistShard(persistCountShard);
  return (
    <div data-testid="persist-wrapper">
      <p data-testid="counter-persist">{counter}</p>
      <button
        onClick={() => setCounter((prev) => prev + 1)}
        data-testid="counter-persist-increase"
      >
        +1
      </button>
      <button
        onClick={() => setCounter((prev) => prev - 1)}
        data-testid="counter-persist-decrease"
      >
        -1
      </button>
      <Child />
    </div>
  );
};

export default Persist;
