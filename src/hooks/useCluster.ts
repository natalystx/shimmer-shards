/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePersistShard, useShard } from "..";
import { PersistShard } from "../core/persist";
import { ClusterMembers, ReturnClusterMembers } from "../types";

export const useCluster = <Type>(
  data: ClusterMembers<Type>
): ReturnClusterMembers<Type> => {
  let states: any = {};
  for (const item in data) {
    if (data[item]?.getKey !== undefined) {
      states[item] = () =>
        usePersistShard(data[item] as unknown as PersistShard);
    } else {
      states[item] = () => useShard(data[item]);
    }
  }

  return states as ReturnClusterMembers<Type>;
};
