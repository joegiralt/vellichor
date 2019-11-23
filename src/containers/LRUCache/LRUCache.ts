/**
 *  Implements an LRUCache using the ES6 Map.prototype and not
 *  a custom doubly linked list.
 */
export class LRUCache {
  public max: number;
  public size: number;
  public store: Map<any, any>;

  /**
   *  Creates a LRUCache.
   *  @time {O(1)
   *  @constructs LRUCache
   *  @param {Object|Number} options object of options or number thats set on this.max.
   *  {@link https://en.wikipedia.org/wiki/Cache_replacement_policies} LRU Cache Strategy - Wikipedia
   */
  constructor(options: ILRUOptions | number) {
    if (typeof options === "object") {
      this.max = options.max;
    } else {
      this.max = options;
    }
    this.store = new Map();
    this.size = this.store.size;
  }

  /**
   *  Returns a value from the cache associated with a key.
   *  @time O(1)
   *  @param {*} key Can be objects or primitive values.
   *  @return {*} Can be objects and primitive values.
   */
  public get(key: any): any {
    const value = this.store.get(key);
    if (!value) {
      return undefined;
    }
    this.store.delete(key);
    this.store.set(key, value);
    return value;
  }

  /**
   *  sets a value from the cache associated with a key
   *  @time O(1)
   *  @param {*} key Can be objects or primitive values.
   *  @param {*} value Can be objects or primitive values.
   *  @return {LRUCache} this instance
   */
  public set(key: any, value: any): LRUCache {
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
   *  @time O(1)
   *  @return {LRUCache} this instance
   */
  public delete(key: any): LRUCache {
    this.store.delete(key);
    this.size = this.store.size;
    return this;
  }

  /**
   *  clears all keys and values from the store and sets size to 0
   *  @time O(1)
   *  @return {LRUCache} this instance
   */
  public clear(): LRUCache {
    this.store.clear();
    this.size = this.store.size;
    return this;
  }

  /**
   *  Updates the max capacity of the cache. If the
   *  max capacity of the cache is less than the current max capacity
   *  and the cache is at max capacity, the cache will shed
   *  the older items.
   *  @time O(n)
   *  @param {number} newMax The value that will be the new max capacity for the cache.
   *  @return {LRUCache} This instance.
   */
  public updateMax(newMax: number): LRUCache {
    if (newMax === this.max || this.isZero(newMax) || this.isNegative(newMax)) {
      return this;
    }
    if (newMax > this.max) {
      this.max = newMax;
      return this;
    }
    this.shedOlderEntries(this.max - newMax - (this.max - this.size));

    this.max = newMax;
    return this;
  }

  /**
   *  Checks if value is negative
   *  @private
   *  @param {number} num A positive or negative integer.
   *  @time O(1)
   *  @return {boolean}
   */
  private isNegative(num: number): boolean {
    return Math.sign(num) === -1;
  }

  /**
   *  Checks if value is zero
   *  @private
   *  @param {number} num A positive or negative integer.
   *  @time O(1)
   *  @return {boolean} boolean
   */
  private isZero(num: number): boolean {
    return Math.sign(num) === 0;
  }

  /**
   *  Deletes n oldest entries where n = numberOfEntries, from the store.
   *  @private
   *  @param {number} numberOfEntries Number of older entries to be deleted.
   *  @time O(n)
   */
  private shedOlderEntries(numberOfEntries: number): void {
    for (let i = numberOfEntries; i > 0; i--) {
      const key = this.store.entries().next().value[0];
      this.delete(key);
    }
  }
}

interface ILRUOptions {
  max: number;
}
