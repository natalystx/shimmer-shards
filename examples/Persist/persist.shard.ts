import { persist } from "../../src";

export const persistCountShard = persist({
  initialValue: 0,
  key: "counter",
});

export const persistCountShard2 = persist({
  initialValue: 0,
  key: "counter-2",
});

export const persistCountShard3 = persist({
  initialValue: 0,
  key: "counter-3",
});

export const cluster = {
  useCounter: persistCountShard2,
};
