/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Shard } from "../../core/shard";

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
  const tempID = useRef<string>();

  const id = useMemo(() => {
    if (tempID.current) return tempID.current;
    const scopedId = uuid();
    tempID.current = scopedId;
    if (Array.isArray(shards)) {
      const scopedShards = shards.map((i) => {
        const newShard = new Shard(i.getInitialValue(), i.getId());
        newShard.addScope(scopedId);
        return newShard;
      });
      scopedList.set(scopedId, scopedShards);
    } else {
      const keys = Object.keys(shards);
      const scopedShards = keys.map((i: string) => {
        if ((shards as any)[i]?.getKey !== undefined) {
          return (shards as any)[i] as Shard;
        }

        const currentShard = (shards as any)[i] as Shard;
        const newShard = new Shard(
          currentShard.getInitialValue(),
          currentShard.getId()
        );
        newShard.addScope(scopedId);
        return newShard;
      });
      scopedList.set(scopedId, scopedShards);
    }

    return scopedId;
  }, []);

  return (
    <Context.Provider value={{ scopeId: id }}>{children}</Context.Provider>
  );
};

export { Scope };
