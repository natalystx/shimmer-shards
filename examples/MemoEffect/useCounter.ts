import { shard, useShard, effect, memo } from "../../src";

export const counterShard = shard(0);

export const useCounter = memo((fn?: () => void) => {
  const [counter, setCounter] = useShard(counterShard);
  fn && effect(fn, []);
  fn && effect(fn, [counter]);
  return {
    counter,
    setCounter,
  };
});
