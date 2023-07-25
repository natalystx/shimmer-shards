import { Shard, shard } from "../src/core/shard";

jest.mock("../src/core/shard", () => {
  return {
    Shard: jest.fn().mockImplementation(() => ({
      getId: jest.fn().mockImplementation(() => "someID"),
      getInitialValue: jest.fn().mockImplementation(() => "something"),
      addScope: jest.fn(),
      getScope: jest.fn(),
    })),
    shard: jest.fn().mockImplementation(() =>
      jest.fn().mockImplementation(() => ({
        getId: jest.fn().mockImplementation(() => "someID"),
        getInitialValue: jest.fn().mockImplementation(() => "something"),
        addScope: jest.fn(),
        getScope: jest.fn(),
      }))
    ),
  };
});

describe("Shard", () => {
  const shardClass = new Shard("test");
  test("is Shard exist", () => {
    expect(Shard).toBeCalledTimes(1);
    expect(shard).toBeDefined();
  });

  test("is getId working", () => {
    const id = shardClass.getId();
    expect(shardClass.getId).toBeCalled();
    expect(id).toEqual("someID");
  });

  test("is getInitialValue working", () => {
    const value = shardClass.getInitialValue();
    expect(shardClass.getInitialValue).toBeCalled();
    expect(value).toEqual("something");
  });

  test("is addScope working", () => {
    shardClass.addScope("ss");
    expect(shardClass.addScope).toBeCalled();
  });

  test("is addScope working", () => {
    const scopedId = shardClass.getScope();
    expect(shardClass.getScope).toBeCalled();
    expect(scopedId).toBeUndefined();
  });

  test("is shard Function working", () => {
    const shardData = shard("test");
    expect(shard).toBeCalled();
    expect(shardData).toBeDefined();
  });
});
