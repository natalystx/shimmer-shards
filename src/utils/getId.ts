import { Shard } from "../core/shard";

export const getId = <Type>(
  list: Map<string, Shard[]>,
  shard: Shard<Type>,
  scopeId?: string
) => {
  const scopedId = `${scopeId}-${shard.getId()}`;
  return list.get(scopeId || "")?.find((i) => i.getScope() === scopeId)
    ? scopedId
    : shard.getId();
};
