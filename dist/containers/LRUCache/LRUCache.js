"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LRUCache {
    /**
     *  creates a LRUCache
     *  @time {O(1)}
     */
    constructor(options) {
        if (typeof options === "object") {
            this.max = options.max;
        }
        else {
            this.max = options;
        }
        this.store = new Map();
        this.size = this.store.size;
    }
    /**
     *  gets a value from the cache associated with a key
     *  @time {O(1)}
     */
    get(key) {
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
     *  @time {O(1)}
     */
    set(key, value) {
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
    delete(key) {
        this.store.delete(key);
        this.size = this.store.size;
        return this;
    }
    /**
     *  clears all keys and values from the store and sets size to 0
     *  @time {O(1)}
     */
    clear() {
        this.store.clear();
        this.size = this.store.size;
        return this;
    }
    /**
     *  updates the max capacity of the cache, if the
     *  max capcity of the cache is less than the current max
     *  and the cache is at max capacity, the cache will shed
     *  the older items
     *  @time {O(n)}
     */
    updateMax(newMax) {
        if (newMax === this.max || this.isZero(newMax) || this.isNegative(newMax)) {
            return this;
        }
        if (newMax > this.max) {
            this.max = newMax;
            return this;
        }
        this.shedOlderEntries((this.max - newMax) - (this.max - this.size));
        this.max = newMax;
        return this;
    }
    /**
     *  checks if value is negative
     *  @time {O(1)}
     */
    isNegative(num) {
        return Math.sign(num) === -1;
    }
    /**
     *  checks if value is zero
     *  @time {O(1)}
     */
    isZero(num) {
        return Math.sign(num) === 0;
    }
    /**
     *  deletes n oldest entries
     *  @time {O(n)}
     */
    shedOlderEntries(numberOfEntries) {
        // new Array(numberOfEntries).forEach(_ => {
        //   const key = this.store.entries().next().value[0];
        //   this.delete(key);
        // });
        for (let i = numberOfEntries; i > 0; i--) {
            const key = this.store.entries().next().value[0];
            this.delete(key);
        }
    }
}
exports.LRUCache = LRUCache;
//# sourceMappingURL=LRUCache.js.map