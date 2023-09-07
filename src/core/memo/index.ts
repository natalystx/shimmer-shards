/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { v4 as uuid } from "uuid";
let memoId = "";

export const getMemoId = () => memoId;

export const memo = <T extends Function>(fn: T): T => {
  const id = uuid();

  const handler = {
    apply: (target: T, thisArg: unknown, argumentsList: unknown[]) => {
      memoId = id;
      return target(...argumentsList);
    },
  };
  const proxy = new Proxy(fn, handler);

  return proxy;
};
