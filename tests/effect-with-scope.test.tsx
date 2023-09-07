/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MemoEffectScopeComponent from "../examples/MemoEffectWithScope";
const fn = jest.fn();
const fn2 = jest.fn();
const fn3 = jest.fn();
beforeEach(() => {
  fn.mockClear();
  fn2.mockClear();
  fn3.mockClear();
  render(<MemoEffectScopeComponent fn={fn} fn2={fn2} fn3={fn3} />);
});
afterEach(() => {
  fn.mockClear();
  fn2.mockClear();
  fn3.mockClear();
});

describe("effect", () => {
  test("is Render and fn is call correctly at first render", () => {
    expect(screen.getByTestId("counter-text-A-scope")).toBeInTheDocument();
    expect(screen.getByTestId("counter-text-B-scope")).toBeInTheDocument();
    expect(fn).toBeCalledTimes(2);
    expect(fn2).toBeCalledTimes(1);
    expect(fn3).toBeCalledTimes(2);
  });

  test("fn is call correctly with deps synced and scope separate", () => {
    const button = screen.getByTestId("counter-increase-button-scope");
    const outsideButton = screen.getByTestId(
      "counter-increase-button-outside-scope"
    );
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(3);
    expect(fn2).toBeCalledTimes(2);
    expect(fn3).toBeCalledTimes(0);
    expect(screen.getByTestId("counter-text-A-scope").innerHTML).toEqual("1");
    expect(screen.getByTestId("counter-text-outside-scope").innerHTML).toEqual(
      "0"
    );
    expect(screen.getByTestId("counter-text-B-scope").innerHTML).toEqual("1");
    fireEvent.click(outsideButton);
    expect(screen.getByTestId("counter-text-outside-scope").innerHTML).toEqual(
      "1"
    );
    expect(fn).toBeCalledTimes(3);
    expect(fn2).toBeCalledTimes(2);
    expect(fn3).toBeCalledTimes(1);
  });
});
