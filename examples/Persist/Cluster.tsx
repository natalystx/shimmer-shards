import React from "react";
import { useCluster } from "../../src";
import { cluster } from "./persist.shard";

const Cluster = () => {
  const { useCounter } = useCluster(cluster);
  const [counter, setCounter] = useCounter();
  return (
    <div data-testid="persist-wrapper">
      <p data-testid="counter-persist">{counter()}</p>
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
    </div>
  );
};

export default Cluster;
