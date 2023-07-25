import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Cluster from "../../examples/Cluster";
import "@testing-library/jest-dom";

describe("useCluster", () => {
  beforeEach(() => {
    render(<Cluster />);
  });
  test("is Component rendered", () => {
    expect(screen.getByTestId("cluster-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("child-wrapper")).toBeInTheDocument();
  });
  test("is initial value correct", () => {
    expect(screen.getByTestId("parent-text").innerHTML).toEqual("josh");
    expect(screen.getByTestId("child-counter-text").innerHTML).toEqual("0");
  });
  test("is counter update correctly", () => {
    expect(screen.getByTestId("child-counter-text").innerHTML).toEqual("0");
    const increaseButton = screen.getByTestId("parent-increase-button");
    fireEvent.click(increaseButton);
    expect(screen.getByTestId("child-counter-text").innerHTML).toEqual("1");
  });
  test("is name update correctly", () => {
    expect(screen.getByTestId("parent-text").innerHTML).toEqual("josh");
    const nameInput = screen.getByTestId("child-name-input");
    fireEvent.change(nameInput, {
      target: {
        value: "new value",
      },
    });
    expect(screen.getByTestId("parent-text").innerHTML).toEqual("new value");
  });
});
