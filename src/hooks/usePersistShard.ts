/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { PersistShard } from "../core/persist";
import Publisher from "../core/publisher";
import { State, PrevFn } from "../types";
import { proxyState } from "../utils/proxyState";

const publishers = new Map<string, any>();

export const usePersistShard = <Type>(
  persistShard: PersistShard<Type>
): State<Type> => {
  if (!global.window) return [] as unknown as State<Type>;
  const publisher = new Publisher<Type>();

  let data = JSON.parse(localStorage?.getItem(persistShard.getKey()) || "null");
  const proxyStateData = proxyState(data || persistShard.getInitialValue());
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
      proxyStateData[1](publishers.get(id)?.getRecentlyData());
    } else {
      proxyStateData[1](
        data ?? persistShard.getInitialValue() ?? persistShard.getFallbackData()
      );
    }

    const subscribe = publishers.get(id)?.subscribe((v: any) => {
      proxyStateData[1](v);
    });

    return () => subscribe?.unsubscribe();
  }, [id]);

  return [
    () => proxyStateData[0],
    (v: Type | PrevFn<Type>): void => {
      if (typeof v === "function") {
        const newValue = (v as unknown as Function)(
          publishers.get(id)?.getRecentlyData() ||
            persistShard.getInitialValue()
        ) as Type;
        localStorage?.setItem(persistShard.getKey(), JSON.stringify(newValue));
        publishers.get(id)?.publish(newValue);
        return;
      }

      publishers.get(id)?.publish(v);
      localStorage?.setItem(persistShard.getKey(), JSON.stringify(v));
    },
  ];
};
