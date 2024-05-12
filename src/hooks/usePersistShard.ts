/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { PersistShard } from "../core/persist";
import Publisher from "../core/publisher";
import { State, PrevFn } from "../types";

const publishers = new Map<string, any>();

declare const global: any;

export const usePersistShard = <Type>(
  persistShard: PersistShard<Type>
): State<Type> => {
  if (typeof global !== "undefined") {
    if (!global.window) {
      return [persistShard.getFallbackData(), () => {}];
    }
  }

  const publisher = new Publisher<Type>();

  let data = JSON.parse(localStorage?.getItem(persistShard.getKey()) || "null");
  const [state, setState] = useState(data || persistShard.getInitialValue());
  const id = persistShard.getId();
  useEffect(() => {
    if (!id && persistShard.getKey()) return;
    if (!publishers.has(id)) {
      publishers.set(id, publisher);
    }

    if (data === null) {
      localStorage?.setItem(
        persistShard.getKey(),
        JSON.stringify(persistShard.getInitialValue())
      );
      data = persistShard.getInitialValue();
    }

    if (publishers.get(id)?.getRecentlyData()) {
      setState(publishers.get(id)?.getRecentlyData());
    } else {
      setState(
        data ?? persistShard.getInitialValue() ?? persistShard.getFallbackData()
      );
    }

    const subscribe = publishers.get(id)?.subscribe((v: any) => {
      setState(v);
    });

    return () => subscribe?.unsubscribe();
  }, [id]);

  return [
    state as Type,
    (v: Type | PrevFn<Type>): void => {
      if (typeof v === "function") {
        const newValue = (v as unknown as Function)(state) as Type;
        localStorage?.setItem(persistShard.getKey(), JSON.stringify(newValue));
        publishers.get(id)?.publish(newValue);
        return;
      }

      publishers.get(id)?.publish(v);
      localStorage?.setItem(persistShard.getKey(), JSON.stringify(v));
    },
  ];
};
