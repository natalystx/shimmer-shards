/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ClusterPersist from "../../examples/Persist/Cluster";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

let component: any = null;

beforeEach(() => {
  component = render(<ClusterPersist />);
});

afterEach(() => {
  component.unmount();
});

describe("Cluster persist shard", () => {
  test("is render", () => {
    expect(screen.getByTestId("persist-wrapper")).toBeInTheDocument();
  });

  test("initial is correct", () => {
    expect(screen.getByTestId("counter-persist")).toBeInTheDocument();
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("0");
  });

  test("initial add 4", () => {
    const element = screen.getByTestId("counter-persist-increase");
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("4");
  });

  test("initial decrease 2", () => {
    const element = screen.getByTestId("counter-persist-decrease");
    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.getByTestId("counter-persist").innerHTML).toEqual("2");
    expect(localStorage.getItem("counter-2")).toEqual("2");
  });
});

describe("Cluster persist shard usePersistShard Persisting", () => {
  test("is Persisting work", () => {
    expect(localStorage.getItem("counter-2")).toEqual("2");
  });
});
