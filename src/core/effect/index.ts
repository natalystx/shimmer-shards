/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useRef } from "react";
import { useScope } from "../../components/Scope";
import { getEffectKey } from "../../utils/getEffectKey";
import { getMemoId } from "../memo";

const lastDeps = new Map<string, unknown[]>();
const mounted = new Set<string>();

export const effect = (fn: () => void, deps: unknown[]) => {
  const { scopeId } = useScope();
  const scopeIdString = scopeId ? `${scopeId}-` : "";

  const key = `${scopeIdString}${getMemoId()}-${getEffectKey(fn, deps)}`;
  const lastSync = useRef(lastDeps.get(key));

  if (!getMemoId()) {
    throw new Error("The effect function must be using within memo");
  }

  useEffect(() => {
    if (!mounted.has(getMemoId()) && lastSync.current) {
      mounted.add(getMemoId());
      fn();
    }
    return () => {
      mounted.delete(getMemoId());
    };
  }, []);

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
