import React from "react";
import { Scope, useShard } from "../../src";
import { counter, name } from "./shard.constant";

const ComponentA = ({ id }: { id: string }) => {
  const [counterValue, setCounter] = useShard(counter);
  const [nameValue] = useShard(name);
  return (
    <div data-testid={`component-a-${id}`}>
      <p data-testid={`component-a-${id}-name`}>{nameValue}</p>
      <p data-testid={`component-a-${id}-counter`}>{counterValue}</p>
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
  const [counterValue] = useShard(counter);
  const [nameValue, setName] = useShard(name);
  return (
    <div data-testid={`component-b-${id}`}>
      <p data-testid={`component-b-${id}-counter`}>{counterValue}</p>
      <p data-testid={`component-b-${id}-name`}>{nameValue}</p>
      <input
        onChange={(e) => setName(e.target.value)}
        data-testid={`component-b-name-${id}-input`}
      />
    </div>
  );
};

const OutSideScope = () => {
  const [nameValue, setName] = useShard(name);
  const [counterValue] = useShard(counter);
  return (
    <div data-testid="outside-scope-wrapper">
      <p data-testid="outside-scope-name-value">{nameValue}</p>
      <input
        onChange={(e) => setName(e.target.value)}
        data-testid="outside-scope-name-input"
      />
      <p data-testid="outside-scope-counter-value">{counterValue}</p>
    </div>
  );
};

const ScopeComponent = () => {
  return (
    <div data-testid="wrapper">
      <OutSideScope />
      <Scope shards={[counter, name]}>
        <div data-testid="scope-1">
          <ComponentA id="1" />
          <ComponentB id="1" />
        </div>
      </Scope>
      <Scope shards={[counter, name]}>
        <div data-testid="scope-2">
          <ComponentA id="2" />
          <ComponentB id="2" />
        </div>
      </Scope>
    </div>
  );
};

export default ScopeComponent;
