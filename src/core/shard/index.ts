/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import Publisher from "../publisher";
import { v4 as uuid } from "uuid";
import { PrevFn, State } from "../cluster";
import { scopedList, useScope } from "../Scope";
import { getId } from "../../utils/getId";

const publishers = new Map<string, Publisher<any>>();

export class Shard<Type = {}> {
  private value: Type;
  private uuid = uuid();
  private scoped?: string;
  constructor(initialValue: Type) {
    this.value = initialValue;
  }

  getId = () => {
    return this.uuid;
  };

  getInitialValue = () => {
    return this.value;
  };

  addScope = (id: string) => {
    this.scoped = id;
  };

  getScope = () => this.scoped;
}

export const shard = <Type>(initial: Type) => {
  return new Shard(initial);
};

export const useShard = <Type>(shard: Shard<Type>): State<Type> => {
  const [state, setState] = useState(shard.getInitialValue());
  const publisher = new Publisher<Type>();
  const { scopeId } = useScope();

  const id = useMemo(() => getId(scopedList, shard, scopeId), [scopeId]);

  useEffect(() => {
    if (!id) return;
    if (!publishers.has(id)) {
      publishers.set(id, publisher);
    }

    if (publishers.get(id)?.getRecentlyData()) {
      setState(publishers.get(id)?.getRecentlyData());
    }
    const subscribe = publishers.get(id)?.subscribe((v) => {
      setState(v);
    });

    return () => subscribe?.unsubscribe();
  }, [id]);

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

export const useStoreValue = <Type>(shard: Shard<Type>): Type => {
  const [state, setState] = useState(shard.getInitialValue());
  const publisher = new Publisher<Type>();
  const { scopeId } = useScope();
  const id = useMemo(() => getId(scopedList, shard, scopeId), [scopeId]);

  useEffect(() => {
    if (!publishers.has(id)) {
      publishers.set(id, publisher);
    }
    publishers.get(id)?.subscribe((v: Type) => {
      setState(v);
    });
  }, []);

  return state;
};
