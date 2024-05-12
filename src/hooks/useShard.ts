/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useMemo, useEffect } from "react";
import { useScope, scopedList } from "../components/Scope";
import Publisher from "../core/publisher";
import { Shard } from "../core/shard";
import { State, PrevFn } from "../types";
import { getId } from "../utils/getId";

const publishers = new Map<string, Publisher<any>>();

export const useShard = <Type>(shard: Shard<Type>): State<Type> => {
  const { scopeId } = useScope();
  const id = useMemo(() => getId(scopedList, shard, scopeId), [scopeId]);
  const [state, setState] = useState(
    publishers?.get(id)?.getRecentlyData() ?? shard.getInitialValue()
  );
  const publisher = new Publisher<Type>();

  useEffect(() => {
    if (!id) return;
    if (!publishers.has(id)) {
      publishers.set(id, publisher);
    }

    if (publishers.get(id)?.getRecentlyData()) {
      setState(publishers.get(id)?.getRecentlyData());
    }

    const subscribe = publishers.get(id)?.subscribe((v: Type) => {
      setState(v);
    });

    return () => subscribe?.unsubscribe();
  }, []);

  return [
    state,
    (v: Type | PrevFn<Type>): void => {
      if (typeof v === "function") {
        const newValue = (v as unknown as Function)(state) as Type;
        publishers.get(id)?.publish(newValue);
        return;
      }

      publishers.get(id)?.publish(v);
    },
  ];
};
