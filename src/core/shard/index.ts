/* eslint-disable @typescript-eslint/ban-types */

import { v4 as uuid } from "uuid";

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
