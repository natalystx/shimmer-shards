import Publisher from "../src/core/publisher";
jest.mock("../src/core/publisher", () => {
  return jest.fn().mockImplementation(function () {
    return {
      publish: jest.fn(),
      subscribe: jest.fn().mockImplementation((fn: <T>(v: T) => void) => {
        fn("test");
        return {
          unsubscribe: jest.fn(),
        };
      }),
      getRecentlyData: jest.fn().mockImplementation(() => "test"),
    };
  });
});

describe("Publisher", () => {
  const publisher = new Publisher<string>();
  test("is Publisher exist", () => {
    expect(publisher).not.toBeUndefined();
    expect(Publisher).toBeCalledTimes(1);
  });

  test("is publish method working", () => {
    publisher.publish("test");
    expect(publisher.publish).toBeCalled();
  });

  test("is subscribe method working", () => {
    let data = "";
    const updateFn = jest.fn().mockImplementation((v) => {
      data = v;
    });
    const subscriber = publisher.subscribe(updateFn);
    subscriber.unsubscribe();
    expect(publisher.subscribe).toBeCalled();
    expect(subscriber).toBeDefined();
    expect(subscriber.unsubscribe).toBeDefined();
    expect(subscriber.unsubscribe).toBeCalled();
    expect(updateFn).toBeCalled();
    expect(data).toEqual("test");
  });
  test("is getRecentlyData working", () => {
    expect(publisher.getRecentlyData()).toEqual("test");
  });
});
