import { memo } from "../src";
import { getMemoId } from "../src/core/memo";

describe("memo Function", () => {
  test("is exist", () => {
    expect(memo).toBeDefined();
  });

  test("get back same Function", () => {
    const fn = jest.fn();
    expect(memo(fn)).toBeDefined();
    expect(typeof memo(fn)).toEqual(typeof fn);
  });

  test("get back same Function with args return value", () => {
    let memoID = "";
    const add = (n1: number, n2: number) => {
      memoID = getMemoId();
      return n1 + n2;
    };
    expect(memo(add)).toBeDefined();
    expect(memo(add)(2, 5)).toEqual(add(2, 5));
    expect(memoID).not.toBeFalsy();
  });
});
