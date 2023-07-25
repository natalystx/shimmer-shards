/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScopeComponent from "../../examples/Scope";

describe("Scope", () => {
  beforeEach(() => {
    render(<ScopeComponent />);
  });

  test("is Component rendered", () => {
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("outside-scope-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("component-a-1")).toBeInTheDocument();
    expect(screen.getByTestId("component-a-2")).toBeInTheDocument();
    expect(screen.getByTestId("component-b-1")).toBeInTheDocument();
    expect(screen.getByTestId("component-b-2")).toBeInTheDocument();
  });

  test("is in scope states synced", () => {
    const outsideScopeName = screen.getByTestId("outside-scope-name-value");
    const outsideScopeCounter = screen.getByTestId(
      "outside-scope-counter-value"
    );
    const nameComponentA = screen.getByTestId("component-a-1-name");
    const counterComponentA = screen.getByTestId("component-a-1-counter");
    const nameComponentB = screen.getByTestId("component-b-1-name");
    const counterComponentB = screen.getByTestId("component-b-1-counter");
    const increaseButtonInAComponent = screen.getByTestId(
      "component-a-increase-1-button"
    );
    const inputInComponentB = screen.getByTestId("component-b-name-1-input");

    expect(nameComponentA.innerHTML).toEqual(nameComponentB.innerHTML);
    expect(counterComponentA.innerHTML).toEqual(counterComponentB.innerHTML);
    fireEvent.click(increaseButtonInAComponent);
    expect(counterComponentA.innerHTML).toEqual("1");
    expect(counterComponentA.innerHTML).toEqual(counterComponentB.innerHTML);
    expect(outsideScopeCounter.innerHTML).toEqual("0");
    fireEvent.change(inputInComponentB, {
      target: {
        value: "test",
      },
    });
    expect(nameComponentA.innerHTML).toEqual("test");
    expect(nameComponentA.innerHTML).toEqual(nameComponentB.innerHTML);
    expect(outsideScopeName.innerHTML).toEqual("josh");
  });

  test("is each scopes are separated", () => {
    const outsideScopeName = screen.getByTestId("outside-scope-name-value");
    const outsideScopeNameInput = screen.getByTestId(
      "outside-scope-name-input"
    );

    const nameComponentScope1A = screen.getByTestId("component-a-1-name");
    const inputInComponentScope1B = screen.getByTestId(
      "component-b-name-1-input"
    );
    const nameComponentScope2A = screen.getByTestId("component-a-2-name");
    const inputInComponentScope2B = screen.getByTestId(
      "component-b-name-2-input"
    );

    // update scoped name in scope 1
    fireEvent.change(inputInComponentScope1B, {
      target: {
        value: "Hi scope 1",
      },
    });
    expect(nameComponentScope1A.innerHTML).not.toEqual(
      nameComponentScope2A.innerHTML
    );

    // update scope 2 to be equal as scope 1
    fireEvent.change(inputInComponentScope2B, {
      target: {
        value: "Hi scope 1",
      },
    });

    expect(nameComponentScope1A.innerHTML).toEqual(
      nameComponentScope2A.innerHTML
    );

    // outside scoped must be not update
    expect(outsideScopeName.innerHTML).not.toEqual(
      nameComponentScope1A.innerHTML || nameComponentScope2A.innerHTML
    );

    //update outside scope value
    fireEvent.change(outsideScopeNameInput, {
      target: {
        value: "Hi scope from outside",
      },
    });

    // scoped value must be not update
    expect(outsideScopeName.innerHTML).not.toEqual(
      nameComponentScope1A.innerHTML || nameComponentScope2A.innerHTML
    );
  });
});
