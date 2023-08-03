import React from "react";
import { Scope, usePersistShard } from "../../src";
import { persistCountShard3 } from "./persist.shard";

const Component = ({ id = "" }: { id: string }) => {
  const [counter, setCounter] = usePersistShard(persistCountShard3);
  return (
    <div data-testid={"persist-wrapper" + `-${id}`}>
      <p data-testid={"counter-persist" + `-${id}`}>{counter}</p>
      <button
        onClick={() => setCounter((prev) => prev + 1)}
        data-testid={"counter-persist-increase" + `-${id}`}
      >
        +1
      </button>
      <button
        onClick={() => setCounter((prev) => prev - 1)}
        data-testid={"counter-persist-decrease" + `-${id}`}
      >
        -1
      </button>
    </div>
  );
};

const ScopeExample = () => {
  return (
    <div>
      <Component id="" />
      <Scope shards={[persistCountShard3]}>
        <Component id="a" />
      </Scope>
      <Scope shards={[persistCountShard3]}>
        <Component id="b" />
      </Scope>
    </div>
  );
};

export default ScopeExample;
