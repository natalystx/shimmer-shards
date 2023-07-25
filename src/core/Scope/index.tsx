import React, { createContext, useContext, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Shard } from "../shard";
export const scopedList = new Map<string, Shard[]>();

type ContextProps = {
  scopeId?: string;
};
type ScopeContextProps = {
  children: React.ReactNode;
  shards: Shard[];
};

const Context = createContext<ContextProps>({});
export const useScope = () => useContext(Context);

const Scope = ({ children, shards }: ScopeContextProps) => {
  const id = useMemo(() => {
    const scopedId = uuid();

    const scopedShards = shards.map((i) => {
      i.addScope(scopedId);
      return i;
    });
    scopedList.set(scopedId, scopedShards);
    return scopedId;
  }, [shards]);

  return (
    <Context.Provider value={{ scopeId: id }}>{children}</Context.Provider>
  );
};

export { Scope };
