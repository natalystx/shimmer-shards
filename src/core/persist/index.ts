/* eslint-disable @typescript-eslint/ban-types */
import { Shard } from "../shard";

type PersistConfig<Type> = {
  initialValue: Type;
  fallback?: Type;
  key: string;
};

export class PersistShard<Type = {}> extends Shard<Type> {
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
