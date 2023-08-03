/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from "react";
import { Shard } from "../shard";
import Publisher from "../publisher";
import { PrevFn, State } from "../cluster";

const publishers = new Map<string, any>();

type PersistConfig<Type> = {
  initialValue: Type;
  fallback?: Type;
  key: string;
};

export class PersistShard<Type> extends Shard<Type> {
  private fallback?: Type;
  private key: string;

  constructor({ initialValue, fallback, key }: PersistConfig<Type>) {
    super(initialValue);
    this.key = key;
    this.fallback = fallback;
  }

  getKey = () => this.key;

  getFallbackData = () => this.fallback;
}

export const persist = <Type>(config: PersistConfig<Type>) => {
  return new PersistShard(config);
};
export const usePersistShard = <Type>(
  persistShard: PersistShard<Type>
): State<Type> => {
  const publisher = new Publisher<Type>();

  let data = JSON.parse(localStorage.getItem(persistShard.getKey()) || "null");
  const [state, setState] = useState(data || persistShard.getInitialValue());
  const id = persistShard.getId();
  useEffect(() => {
    if (!id && persistShard.getKey()) return;
    if (!publishers.has(id)) {
      publishers.set(id, publisher);
    }

    if (data === null) {
      localStorage.setItem(
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
        localStorage.setItem(persistShard.getKey(), JSON.stringify(newValue));
        publishers.get(id)?.publish(newValue);
        return;
      }

      publishers.get(id)?.publish(v);
      localStorage.setItem(persistShard.getKey(), JSON.stringify(v));
    },
  ];
};
