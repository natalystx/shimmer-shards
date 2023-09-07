import { hashString } from "./hashString";

export const getEffectKey = (fn: () => void, deps: unknown[]) => {
  const key = hashString(
    `${fn.toString()}-${JSON.stringify(deps.map((i) => typeof i))}`
  ).toString();

  return key;
};
