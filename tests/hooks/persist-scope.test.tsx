/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScopeExample from "../../examples/Persist/Scope";

let component: any;

beforeEach(() => {
  component = render(<ScopeExample />);
});

afterEach(() => {
  component.unmount();
});

describe("Persist shard with scope", () => {
  test("is render", () => {
    expect(screen.getByTestId("persist-wrapper-")).toBeInTheDocument();
    expect(screen.getByTestId("persist-wrapper-a")).toBeInTheDocument();
    expect(screen.getByTestId("persist-wrapper-b")).toBeInTheDocument();
  });

  test("initial is correct", () => {
    expect(screen.getByTestId("counter-persist-")).toBeInTheDocument();
    expect(screen.getByTestId("counter-persist-a")).toBeInTheDocument();
    expect(screen.getByTestId("counter-persist-b")).toBeInTheDocument();

    expect(screen.getByTestId("counter-persist-").innerHTML).toEqual("0");
    expect(screen.getByTestId("counter-persist-a").innerHTML).toEqual("0");
    expect(screen.getByTestId("counter-persist-b").innerHTML).toEqual("0");
  });

  test("initial add 4", () => {
    const element = screen.getByTestId("counter-persist-increase-");
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.getByTestId("counter-persist-").innerHTML).toEqual("4");
    expect(screen.getByTestId("counter-persist-a").innerHTML).toEqual("4");
    expect(screen.getByTestId("counter-persist-b").innerHTML).toEqual("4");
  });

  test("initial decrease 2", () => {
    const element = screen.getByTestId("counter-persist-decrease-a");
    const element2 = screen.getByTestId("counter-persist-decrease-b");

    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.getByTestId("counter-persist-").innerHTML).toEqual("2");
    fireEvent.click(element2);
    expect(screen.getByTestId("counter-persist-a").innerHTML).toEqual("1");
  });
});

describe("usePersistShard Persisting", () => {
  test("is Persisting work", () => {
    expect(localStorage.getItem("counter-3")).toEqual("1");
    expect(screen.getByTestId("counter-persist-").innerHTML).toEqual("1");
    expect(screen.getByTestId("counter-persist-a").innerHTML).toEqual("1");
    expect(screen.getByTestId("counter-persist-b").innerHTML).toEqual("1");
  });
});
