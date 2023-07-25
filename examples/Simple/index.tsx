import React from "react";
import { useShard } from "../../src";
import { counterShard } from "./shard.constant";
import Child from "./Child";

const Simple = () => {
  const [counter, setCounter] = useShard(counterShard);
  return (
    <>
      <div data-testid="simple-wrapper">
        <p data-testid="counter-text">{counter}</p>
        <button
          data-testid="increase-counter-button"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          +1
        </button>
        <button
          data-testid="decrease-counter-button"
          onClick={() => setCounter((prev) => prev - 1)}
        >
          -1
        </button>
      </div>
      <Child />
    </>
  );
};

export default Simple;
