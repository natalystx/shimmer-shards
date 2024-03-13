import React from "react";
import { useCounter } from "./useCounter";
import { useAnother } from "./useAnother";

type Props = {
  fn: () => void;
  fn2?: () => void;
};

const A = ({ fn }: Props) => {
  const { counter } = useCounter(fn);
  return <div data-testid="counter-text-A">{counter()}</div>;
};
const B = ({ fn, fn2 }: Props) => {
  const { counter, setCounter } = useCounter(fn);
  useAnother(fn2);

  return (
    <div>
      <div data-testid="counter-text-B">{counter()}</div>
      <button
        data-testid="counter-increase-button"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        increase
      </button>
    </div>
  );
};

const MemoEffectComponent = ({ fn, fn2 }: Props) => {
  return (
    <div>
      <A fn={fn} />
      <B fn={fn} fn2={fn2} />
    </div>
  );
};

export default MemoEffectComponent;
