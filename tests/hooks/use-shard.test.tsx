/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Simple from "../../examples/Simple";

describe("useShard()", () => {
  beforeEach(() => {
    render(<Simple />);
  });

  afterEach(() => {
    cleanup();
  });

  test("is Component rendered", () => {
    expect(screen.getByTestId("simple-wrapper")).toBeInTheDocument();
  });
  test("is Child component rendered", () => {
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("initial value is 0", () => {
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("0");
    expect(screen.getByTestId("child").innerHTML).toEqual("0");
  });

  test("both are synced", () => {
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("0");
    expect(screen.getByTestId("child").innerHTML).toEqual("0");
    expect(screen.getByTestId("increase-counter-button")).toBeInTheDocument();
    expect(screen.getByTestId("decrease-counter-button")).toBeInTheDocument();
    const increaseButton = screen.getByTestId("increase-counter-button");
    const childIncreaseButton = screen.getByTestId("increase-from-child");
    const decreaseButton = screen.getByTestId("decrease-counter-button");
    fireEvent.click(increaseButton);
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("1");
    expect(screen.getByTestId("child").innerHTML).toEqual("1");
    fireEvent.click(decreaseButton);
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("0");
    expect(screen.getByTestId("child").innerHTML).toEqual("0");
    fireEvent.click(childIncreaseButton);
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("1");
    expect(screen.getByTestId("child").innerHTML).toEqual("1");
    fireEvent.click(decreaseButton);
  });

  test("hidden component synced", () => {
    expect(screen.queryByTestId("hidden-element")).not.toBeInTheDocument();
    const increaseButton = screen.getByTestId("increase-counter-button");
    const decreaseButton = screen.getByTestId("decrease-counter-button");
    const showButton = screen.getByTestId("show-button");
    fireEvent.click(increaseButton);
    fireEvent.click(showButton);
    expect(screen.queryByTestId("hidden-element")).toBeInTheDocument();
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("1");
    expect(screen.getByTestId("counter-text").innerHTML).toEqual(
      screen.queryByTestId("hidden-element")?.innerHTML
    );
    fireEvent.click(decreaseButton);
    expect(screen.getByTestId("counter-text").innerHTML).toEqual(
      screen.queryByTestId("hidden-element")?.innerHTML
    );
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("0");
  });

  test("is working with useEffect", () => {
    const increaseButton = screen.getByTestId("increase-counter-button");
    expect(screen.getByTestId("counter-text").innerHTML).toEqual("0");
    expect(screen.getByTestId("use-effect-sync").innerHTML).toEqual("0");
    fireEvent.click(increaseButton);
    expect(screen.getByTestId("use-effect-sync").innerHTML).toEqual("2");
  });
});
