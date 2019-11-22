"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_chance_1 = require("jest-chance");
const LRUCache_1 = require("../LRUCache/LRUCache");
test("get and set a value", () => {
    const lruCache = new LRUCache_1.LRUCache(10);
    const value = "ayyyeee!";
    lruCache.set("a", value);
    expect(lruCache.get("a")).toBe(value);
    expect(lruCache.max).toEqual(10);
    expect(lruCache.size).toEqual(1);
});
test("default init values for cache creation", () => {
    expect(new LRUCache_1.LRUCache(10).max).toEqual(10);
    expect(new LRUCache_1.LRUCache({ max: 10000 }).max).toEqual(10000);
});
test("set a value that already exists", () => {
    const lruCache = new LRUCache_1.LRUCache(10);
    lruCache.set("a", 1);
    lruCache.set("a", 1);
    lruCache.set("b", 2);
    lruCache.set("b", 1);
    expect(lruCache.size).toEqual(2);
});
test("key not found returns undefined", () => {
    const lruCache = new LRUCache_1.LRUCache({ max: 10 });
    expect(lruCache.get("a")).toBe(undefined);
});
test("it sheds least recently set k,v", () => {
    const lruCache = new LRUCache_1.LRUCache({ max: 2 });
    lruCache.set("a", jest_chance_1.chance.integer());
    lruCache.set("b", jest_chance_1.chance.integer());
    lruCache.set("c", jest_chance_1.chance.integer());
    expect(lruCache.get("a")).toBe(undefined);
});
test("delete a key from cache", () => {
    const lruCache = new LRUCache_1.LRUCache({ max: 2 });
    lruCache.set("a", jest_chance_1.chance.integer());
    lruCache.delete("a");
    expect(lruCache.get("a")).toBe(undefined);
    expect(lruCache.size).toBe(0);
});
test("cache is cleared", () => {
    const lruCache = new LRUCache_1.LRUCache({ max: 2 });
    lruCache.set("a", jest_chance_1.chance.integer());
    lruCache.set("b", jest_chance_1.chance.integer());
    expect(lruCache.size).toBe(2);
    lruCache.clear();
    expect(lruCache.get("a")).toBe(undefined);
    expect(lruCache.get("b")).toBe(undefined);
    expect(lruCache.size).toBe(0);
});
test("increasing max capacity", () => {
    const cache = new LRUCache_1.LRUCache(10);
    expect(new LRUCache_1.LRUCache(10).updateMax(15).max).toEqual(15);
});
test("passing max thats the same as max set", () => {
    const cache = new LRUCache_1.LRUCache(100);
    expect(cache.updateMax(100).max).toEqual(100);
});
test("updating max capacity to a value thats less than the old max capacity, and size is full", () => {
    const cache = new LRUCache_1.LRUCache(100);
    for (let i = 1; i <= 100; i++) {
        cache.set(i, `some value at ${i}`);
    }
    expect(cache.max).toEqual(100);
    expect(cache.size).toEqual(100);
    cache.updateMax(2);
    expect(cache.max).toEqual(2);
    expect(cache.size).toEqual(2);
    expect(cache.get(100)).toEqual("some value at 100");
    expect(cache.get(99)).toEqual("some value at 99");
    expect(cache.get(98)).toEqual(undefined);
});
test("updating max capacity to a value thats less than the old max capacity, and size isn't full", () => {
    const cache = new LRUCache_1.LRUCache(100);
    cache.set("a", "some value at a");
    cache.set("b", "some value at b");
    cache.set("c", "some value at c");
    expect(cache.max).toEqual(100);
    expect(cache.size).toEqual(3);
    cache.updateMax(2);
    expect(cache.max).toEqual(2);
    expect(cache.size).toEqual(2);
    expect(cache.get("c")).toEqual("some value at c");
    expect(cache.get("b")).toEqual("some value at b");
    expect(cache.get("a")).toEqual(undefined);
});
//# sourceMappingURL=LRUCache.test.js.map