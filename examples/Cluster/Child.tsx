import React from "react";
import { useCluster } from "../../src";
import { cluster } from "./cluster.constant";

const Child = () => {
  const { useCounter, useName } = useCluster(cluster);
  const [counter] = useCounter();
  const [, setName] = useName();
  return (
    <div data-testid="child-wrapper">
      <p data-testid="child-counter-text">{counter()}</p>
      <input
        onChange={(e) => setName(e.target.value)}
        data-testid="child-name-input"
      />
    </div>
  );
};

export default Child;
