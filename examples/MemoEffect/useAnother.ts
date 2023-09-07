import { effect, memo } from "../../src";
import { useCounter } from "./useCounter";

export const useAnother = memo((fn?: () => void) => {
  const { counter } = useCounter();

  fn && effect(() => fn(), [counter]);
});
