/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useMemo, useEffect, useRef } from "react";
import { useScope, scopedList } from "../components/Scope";
import Publisher from "../core/publisher";
import { Shard } from "../core/shard";
import { State, PrevFn } from "../types";
import { getId } from "../utils/getId";
import { proxyState } from "../utils/proxyState";

const publishers = new Map<string, Publisher<any>>();

export const useShard = <Type>(shard: Shard<Type>): State<Type> => {
  const { scopeId } = useScope();
  const id = useMemo(() => getId(scopedList, shard, scopeId), [scopeId]);

  const publisher = new Publisher<Type>();

  const proxyStateData = proxyState(
    publishers?.get(id)?.getRecentlyData() ?? shard.getInitialValue()
  );
  useEffect(() => {
    if (!id) return;
    if (!publishers.has(id)) {
      publishers.set(id, publisher);
    }

    if (publishers.get(id)?.getRecentlyData()) {
      proxyStateData[1](publishers.get(id)?.getRecentlyData());
    }
    const subscribe = publishers.get(id)?.subscribe((v) => {
      proxyStateData[1](v);
    });

    return () => subscribe?.unsubscribe();
  }, []);
  return [
    () => proxyStateData[0],
    (v: Type | PrevFn<Type>): void => {
      if (v === publishers.get(id)?.getRecentlyData()) return;
      if (typeof v === "function") {
        const newValue = (v as unknown as Function)(
          publishers.get(id)?.getRecentlyData() || shard.getInitialValue()
        ) as Type;
        publishers.get(id)?.publish(newValue);
        return;
      }

      publishers.get(id)?.publish(v);
    },
  ];
};
