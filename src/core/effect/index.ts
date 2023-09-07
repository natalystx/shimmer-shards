/* eslint-disable @typescript-eslint/ban-types */
import { useEffect } from "react";
import { useScope } from "../../components/Scope";
import { getEffectKey } from "../../utils/getEffectKey";
import { getMemoId } from "../memo";

const lastDeps = new Map<string, unknown[]>();

export const effect = (fn: () => void, deps: unknown[]) => {
  const { scopeId } = useScope();
  const scopeIdString = scopeId ? `${scopeId}-` : "";

  const key = `${scopeIdString}${getMemoId()}-${getEffectKey(fn, deps)}`;

  if (!getMemoId()) {
    throw new Error("The effect function must be using within memo");
  }

  useEffect(() => {
    if (!lastDeps.has(key)) {
      fn();
      lastDeps.set(key, deps);
      if (!deps.length) return;
    }
    const last = lastDeps.get(key);
    if (JSON.stringify(last) !== JSON.stringify(deps)) {
      fn();
      lastDeps.set(key, deps);
    }
  }, [deps]);
};
