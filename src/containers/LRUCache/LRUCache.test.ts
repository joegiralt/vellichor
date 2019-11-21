import { LRUCache } from "../LRUCache/LRUCache";
import { chance } from "jest-chance";

test("get and set a value", () => {
  const lruCache = new LRUCache(10);
  const value = "ayyyeee!";
  lruCache.set("a", value);
  expect(lruCache.get("a")).toBe(value);
  expect(lruCache.max).toEqual(10);
  expect(lruCache.size).toEqual(1);
});

test("set a value that already exists", () => {
  const lruCache = new LRUCache(10);
  lruCache.set("a", 1);
  lruCache.set("a", 1);
  lruCache.set("b", 2);
  lruCache.set("b", 1);
  expect(lruCache.size).toEqual(2);
});

test("key not found returns undefined", () => {
  const lruCache = new LRUCache({ max: 10 });
  expect(lruCache.get("a")).toBe(undefined);
});

test("it sheds least recently set k,v", () => {
  const lruCache = new LRUCache({ max: 2 });
  lruCache.set("a", chance.integer());
  lruCache.set("b", chance.integer());
  lruCache.set("c", chance.integer());
  expect(lruCache.get("a")).toBe(undefined);
});

test("delete a key from cache", () => {
  const lruCache = new LRUCache({ max: 2 });
  lruCache.set("a", chance.integer());
  lruCache.delete("a");
  expect(lruCache.get("a")).toBe(undefined);
  expect(lruCache.size).toBe(0);
});

test("changing the max drops older items older than the new max", () => {});

test("cache is cleared", () => {});
