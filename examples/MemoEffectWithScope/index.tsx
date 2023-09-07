import React from "react";
import { counterShard, useCounter } from "./useCounter";
import { useAnother } from "./useAnother";
import { Scope } from "../../src";

type Props = {
  fn: () => void;
  fn2?: () => void;
  fn3?: () => void;
};

const A = ({ fn }: Props) => {
  const { counter } = useCounter(fn);
  return <div data-testid="counter-text-A-scope">{counter}</div>;
};
const B = ({ fn, fn2 }: Props) => {
  const { counter, setCounter } = useCounter(fn);
  useAnother(fn2);

  return (
    <div>
      <div data-testid="counter-text-B-scope">{counter}</div>
      <button
        data-testid="counter-increase-button-scope"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        increase
      </button>
    </div>
  );
};

const Outside = ({ fn }: { fn?: () => void }) => {
  const { counter, setCounter } = useCounter(fn);
  return (
    <div>
      {" "}
      <div data-testid="counter-text-outside-scope">{counter}</div>{" "}
      <button
        data-testid="counter-increase-button-outside-scope"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        increase
      </button>
    </div>
  );
};

const MemoEffectScopeComponent = ({ fn, fn2, fn3 }: Props) => {
  return (
    <div>
      <Outside fn={fn3} />
      <Scope shards={[counterShard]}>
        <A fn={fn} />
        <B fn={fn} fn2={fn2} />
      </Scope>
    </div>
  );
};

export default MemoEffectScopeComponent;
