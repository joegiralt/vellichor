interface LRUOptions {
  max: number;
}
export class LRUCache {
  max: number;
  size: number;
  store: Map<any, any>;
  oldestElement: any;

  /**
   *  creates a LRUCache
   *  @time {O(1)}
   */
  constructor(options: LRUOptions | number) {
    if (typeof options === "object") {
      this.max = options.max;
    } else {
      this.max = options;
    }
    this.store = new Map();
    this.size = this.store.size;
  }

  /**
   *  gets a value from the cache associated with a key
   *  @time {O(1)}
   */
  get(key: any) {
    const value = this.store.get(key);
    if (!value) return undefined;
    this.store.delete(key);
    this.store.set(key, value);
    return value;
  }

  /**
   *  sets a value from the cache associated with a key
   *  @time {O(1)}
   */
  set(key: any, value: any) {
    const oldValue = this.get(key);
    if (oldValue === undefined) {
      if (this.store.size === this.max) {
        console.log("size, max", this.store.size, this.max);
        this.store.delete(this.store.entries().next().value[0]);
      }
      this.store.set(key, value);
    }
    this.size = this.store.size;
    return this;
  }

  /**
   *  deletes a key value pair from the cache associated with a key
   *  @time {O(1)}
   */
  delete(key: any) {
    this.store.delete(key);
    this.size = this.store.size;
    return this;
  }
}