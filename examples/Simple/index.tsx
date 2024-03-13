import React, { useEffect, useState } from "react";
import { useShard } from "../../src";
import { counterShard } from "./shard.constant";
import Child from "./Child";

const Hidden = () => {
  const [counter] = useShard(counterShard);
  return <div data-testid="hidden-element">{counter()}</div>;
};

const Simple = () => {
  const [counter, setCounter] = useShard(counterShard);
  const [show, setShow] = useState(false);
  const [double, setDouble] = useState(0);

  useEffect(() => {
    setDouble(counter() * 2);
  }, [counter]);

  return (
    <>
      <div data-testid="simple-wrapper">
        <p data-testid="counter-text">{counter()}</p>
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
      <div data-testid="use-effect-sync">{double}</div>
      <button data-testid="show-button" onClick={() => setShow(true)}>
        show
      </button>
      {show && <Hidden />}
      <Child />
    </>
  );
};

export default Simple;
