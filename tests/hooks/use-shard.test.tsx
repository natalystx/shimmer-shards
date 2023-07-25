import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Simple from "../../examples/Simple";

describe("useShard()", () => {
  beforeEach(() => {
    render(<Simple />);
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

  test("both are synced", async () => {
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
  });
});
