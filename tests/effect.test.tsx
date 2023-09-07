/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MemoEffectComponent from "../examples/MemoEffect";
let component: any;

const fn = jest.fn();
const fn2 = jest.fn();

beforeEach(() => {
  component = render(<MemoEffectComponent fn={fn} fn2={fn2} />);
});

afterEach(() => {
  component.unmount();
});
describe("effect", () => {
  test("is Render", () => {
    expect(screen.getByTestId("counter-text-A")).toBeInTheDocument();
    expect(screen.getByTestId("counter-text-B")).toBeInTheDocument();
  });
  test("fn is call correctly at first render", () => {
    expect(fn).toBeCalledTimes(2);
    expect(fn2).toBeCalledTimes(1);
    expect(screen.getByTestId("counter-text-A").innerHTML).toEqual("0");
    expect(screen.getByTestId("counter-text-B").innerHTML).toEqual("0");
  });
  test("fn is call correctly with deps synced", () => {
    const button = screen.getByTestId("counter-increase-button");
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(3);
    expect(fn2).toBeCalledTimes(2);
    expect(screen.getByTestId("counter-text-A").innerHTML).toEqual("1");
    expect(screen.getByTestId("counter-text-B").innerHTML).toEqual("1");
  });
});
