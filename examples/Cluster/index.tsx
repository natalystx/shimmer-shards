import React from "react";
import { useCluster } from "../../src";
import { cluster } from "./cluster.constant";
import Child from "./Child";

const Cluster = () => {
  const { useCounter, useName } = useCluster(cluster);
  const [, setCounter] = useCounter();
  const [name] = useName();

  return (
    <>
      <div data-testid="cluster-wrapper">
        <button
          onClick={() => setCounter((prev) => prev + 1)}
          data-testid="parent-increase-button"
        >
          add more counter
        </button>
        <p data-testid="parent-text">{name}</p>
      </div>
      <Child />
    </>
  );
};

export default Cluster;
