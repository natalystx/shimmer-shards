import { shard } from "../../src";
const counter = shard(0);
const name = shard("josh");

export const cluster = { useCounter: counter, useName: name };
