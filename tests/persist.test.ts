import { persist, PersistShard } from "../src/core/persist";

jest.mock("../src/core/persist", () => {
  return {
    PersistShard: jest.fn().mockImplementation(() => ({
      getId: jest.fn().mockImplementation(() => "someID"),
      getInitialValue: jest.fn().mockImplementation(() => "something"),
      getKey: jest.fn().mockImplementation(() => "testId"),
      getFallbackData: jest.fn().mockImplementation(() => null),
    })),
    persist: jest.fn().mockImplementation(() =>
      jest.fn().mockImplementation(() => ({
        getId: jest.fn().mockImplementation(() => "someID"),
        getInitialValue: jest.fn().mockImplementation(() => "something"),
        getKey: jest.fn().mockImplementation(() => "testId"),
        getFallbackData: jest.fn().mockImplementation(() => null),
      }))
    ),
  };
});

describe("PersistShard", () => {
  const persistShardClass = new PersistShard({
    initialValue: "test",
    key: "someKey",
  });
  test("is ShaPersistShardrd exist", () => {
    expect(PersistShard).toBeCalledTimes(1);
    expect(PersistShard).toBeDefined();
  });

  test("is getId working", () => {
    const id = persistShardClass.getId();
    expect(persistShardClass.getId).toBeCalled();
    expect(id).toEqual("someID");
  });

  test("is getInitialValue working", () => {
    const value = persistShardClass.getInitialValue();
    expect(persistShardClass.getInitialValue).toBeCalled();
    expect(value).toEqual("something");
  });

  test("is getKey working", () => {
    const value = persistShardClass.getKey();
    expect(persistShardClass.getInitialValue).toBeCalled();
    expect(value).toEqual("testId");
  });

  test("is getFallbackData working", () => {
    const value = persistShardClass.getFallbackData();
    expect(persistShardClass.getInitialValue).toBeCalled();
    expect(value).toEqual(null);
  });

  test("is shard Function working", () => {
    const shardData = persist({ initialValue: "test", key: "someKey" });
    expect(persist).toBeCalled();
    expect(shardData).toBeDefined();
  });
});
