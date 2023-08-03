/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Persist from "../../examples/Persist";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

let component: any = null;

beforeEach(() => {
  component = render(<Persist />);
});

afterEach(() => {
  component.unmount();
});

describe("usePersistShard", () => {
  test("is render", () => {
    expect(screen.getByTestId("persist-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("persist-child")).toBeInTheDocument();
  });

  test("initial is correct", () => {
    expect(screen.getByTestId("counter-persist")).toBeInTheDocument();
    expect(screen.getByTestId("persist-child")).toBeInTheDocument();
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("0");
    expect(screen.getByTestId("persist-child").innerHTML).toEqual("0");
  });

  test("initial add 4", () => {
    const element = screen.getByTestId("counter-persist-increase");
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("4");
    expect(screen.getByTestId("persist-child").innerHTML).toEqual("4");
  });

  test("initial decrease 2", () => {
    const element = screen.getByTestId("counter-persist-decrease");
    const childElementIncreaseButton = screen.getByTestId(
      "persist-increase-from-child"
    );
    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("2");
    fireEvent.click(childElementIncreaseButton);
    expect(screen.getByTestId("persist-child").innerHTML).toEqual("3");
  });
});

describe("usePersistShard Persisting", () => {
  test("is Persisting work", () => {
    expect(localStorage.getItem("counter")).toEqual("3");
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("3");
    expect(screen.getByTestId("persist-child").innerHTML).toEqual("3");
  });
});
