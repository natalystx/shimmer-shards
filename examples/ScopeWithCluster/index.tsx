import React from "react";

import { Scope, useCluster } from "../../src";
import { cluster } from "./cluster.constant";

const ComponentA = ({ id }: { id: string }) => {
  const { useCounter, useName } = useCluster(cluster);
  const [nameValue] = useName();
  const [counterValue, setCounter] = useCounter();
  return (
    <div data-testid={`component-a-${id}`}>
      <p data-testid={`component-a-${id}-name`}>{nameValue()}</p>
      <p data-testid={`component-a-${id}-counter`}>{counterValue()}</p>
      <button
        onClick={() => setCounter((prev) => prev + 1)}
        data-testid={`component-a-increase-${id}-button`}
      >
        +1
      </button>
    </div>
  );
};

const ComponentB = ({ id }: { id: string }) => {
  const { useCounter, useName } = useCluster(cluster);
  const [counterValue] = useCounter();
  const [nameValue, setName] = useName();
  return (
    <div data-testid={`component-b-${id}`}>
      <p data-testid={`component-b-${id}-counter`}>{counterValue()}</p>
      <p data-testid={`component-b-${id}-name`}>{nameValue()}</p>
      <input
        onChange={(e) => setName(e.target.value)}
        data-testid={`component-b-name-${id}-input`}
      />
    </div>
  );
};

const OutSideScope = () => {
  const { useCounter, useName } = useCluster(cluster);
  const [nameValue, setName] = useName();
  const [counterValue] = useCounter();
  return (
    <div data-testid="outside-scope-wrapper">
      <p data-testid="outside-scope-name-value">{nameValue()}</p>
      <input
        onChange={(e) => setName(e.target.value)}
        data-testid="outside-scope-name-input"
      />
      <p data-testid="outside-scope-counter-value">{counterValue()}</p>
    </div>
  );
};

const ScopeWithCluster = () => {
  return (
    <div data-testid="wrapper">
      <OutSideScope />
      <Scope shards={cluster}>
        <div data-testid="scope-1">
          <ComponentA id="1" />
          <ComponentB id="1" />
        </div>
      </Scope>
      <Scope shards={cluster}>
        <div data-testid="scope-2">
          <ComponentA id="2" />
          <ComponentB id="2" />
        </div>
      </Scope>
    </div>
  );
};
ScopeWithCluster;
export default ScopeWithCluster;
