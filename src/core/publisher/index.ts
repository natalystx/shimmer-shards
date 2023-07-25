export default class Publisher<T> {
  private data?: T;
  private subscribers = new Set<(v: T) => void>();

  publish(v: T) {
    this.subscribers.forEach((sub) => sub(v));
    this.data = v;
  }

  getRecentlyData = () => {
    return this.data;
  };

  subscribe(fn: (v: T) => void) {
    this.subscribers.add(fn);

    return {
      unsubscribe: () => {
        this.subscribers.delete(fn);
      },
    };
  }
}
