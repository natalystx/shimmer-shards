import { useRef, useState } from "react";

export const proxyState = <Type>(initialValue: Type) => {
  const consumingState = useRef(false);
  return new Proxy(useState<Type>(initialValue), {
    get: function (target, prop) {
      if (prop === "0") {
        consumingState.current = true;

        return target[prop];
      }
      if (prop === "1") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const fn = (val: Type) => null;

        if (!consumingState.current) return fn;

        return target[prop];
      }
    },
  });
};
