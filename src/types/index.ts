/* eslint-disable @typescript-eslint/ban-types */
import { PersistShard } from "../core/persist";
import { Shard } from "../core/shard";

export type ClusterMembers<Type = {}> = {
  [Property in keyof Type]: Shard<Type[Property]> &
    Partial<PersistShard<Type[Property]>>;
};

export type PrevFn<Type> = (v: Type) => Type;

export type GetState<Type> = () => Type;

export type State<Type> = [GetState<Type>, (v: Type | PrevFn<Type>) => void];

export type ReturnClusterMembers<Type> = {
  [Property in keyof Type]: () => State<Type[Property]>;
};
