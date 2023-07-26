/* eslint-disable @typescript-eslint/ban-types */
import { Shard, useShard } from "../shard";

export type ClusterMembers<Type = {}> = {
  [Property in keyof Type]: Shard<Type[Property]>;
};

export type PrevFn<Type> = (v: Type) => Type;

export type State<Type> = [Type, (v: Type | PrevFn<Type>) => void];

type ReturnClusterMembers<Type> = {
  [Property in keyof Type]: () => State<Type[Property]>;
};

export const useCluster = <Type>(
  data: ClusterMembers<Type>,
): ReturnClusterMembers<Type> => {
  // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
  let states: any = {};
  for (const item in data) {
    states[item] = () => useShard(data[item]);
  }

  return states as ReturnClusterMembers<Type>;
};
