/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Shard } from "../shard";

export const scopedList = new Map<string, Shard[]>();

type ContextProps = {
  scopeId?: string;
};
type ScopeContextProps = {
  children: React.ReactNode;
  shards: Shard[] | Record<string, Shard>;
};

const Context = createContext<ContextProps>({});
export const useScope = () => useContext(Context);

const Scope = ({ children, shards }: ScopeContextProps) => {
  const id = useMemo(() => {
    const scopedId = uuid();

    if (Array.isArray(shards)) {
      const scopedShards = shards.map((i) => {
        i.addScope(scopedId);
        return i;
      });
      scopedList.set(scopedId, scopedShards);
    }

    const keys = Object.keys(shards);

    const scopedShards = keys.map((i: string) => {
      if ((shards as any)[i]?.getKey !== undefined)
        return (shards as any)[i] as Shard;
      (shards as any)[i].addScope(scopedId);
      return (shards as any)[i] as Shard;
    });
    scopedList.set(scopedId, scopedShards);
    return scopedId;
  }, [shards]);

  return (
    <Context.Provider value={{ scopeId: id }}>{children}</Context.Provider>
  );
};

export { Scope };
