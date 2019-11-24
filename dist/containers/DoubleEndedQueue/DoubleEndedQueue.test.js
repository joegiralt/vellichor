"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DoubleEndedQueue_1 = __importDefault(require("../DoubleEndedQueue/DoubleEndedQueue"));
describe("DoubleEndedQueue.constructor", () => {
    it("should take no argument", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.capacityMask).toEqual(3);
        expect(a.list.length).toEqual(4);
        expect(a.size()).toEqual(0);
        expect(a.length).toEqual(0);
    });
    it("should take array argument", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4]);
        const b = new DoubleEndedQueue_1.default([]);
        expect(a.length).toBeGreaterThanOrEqual(4);
        expect(a.toArray()).toEqual([1, 2, 3, 4]);
        expect(b.length).toBe(0);
        expect(b.toArray()).toEqual([]);
    });
    it("should handle a high volume with no out of memory exception", () => {
        const denque = new DoubleEndedQueue_1.default([]);
        let l = 250000;
        while (--l) {
            denque.push(l);
            denque.unshift(l);
        }
        l = 125000;
        while (--l) {
            const a = denque.shift();
            denque.pop();
            denque.shift();
            denque.push(a);
            denque.shift();
            denque.shift();
        }
        denque.clear();
        l = 100000;
        while (--l) {
            denque.push(l);
        }
        l = 100000;
        while (--l) {
            denque.shift();
            denque.shift();
            denque.shift();
            if (l === 25000) {
                denque.clear();
            }
            denque.pop();
            denque.pop();
            denque.pop();
        }
    }, 20000);
});
describe("DoubleEndedQueue.toArray", () => {
    it("should return an array", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4]);
        expect(a.toArray()).toEqual([1, 2, 3, 4]);
    });
});
describe("DoubleEndedQueue.push", () => {
    it("Should do nothing if no arguments", () => {
        const a = new DoubleEndedQueue_1.default();
        const before = a.length;
        const returnValue = a.push();
        expect(returnValue === before);
        expect(a.length === returnValue);
        expect(returnValue === 0);
    });
    it("Should add false-y elements (except undefined)", () => {
        const a = new DoubleEndedQueue_1.default();
        // var before = a.length;
        let pushReturnValue = a.push(0);
        expect(pushReturnValue).toBe(1);
        expect(a.length).toBe(1);
        expect(a.get(0)).toBe(0);
        pushReturnValue = a.push("");
        expect(pushReturnValue).toBe(2);
        expect(a.length).toBe(2);
        expect(a.get(1)).toBe("");
        pushReturnValue = a.push(null);
        expect(pushReturnValue).toBe(3);
        expect(a.length).toBe(3);
        expect(a.get(2)).toBe(null);
    });
    it("Should add single argument - plenty of capacity", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5]);
        expect(a.list.length - a.length).toBeGreaterThan(1);
        const before = a.length;
        const pushReturnValue = a.push(1);
        expect(pushReturnValue).toEqual(before + 1);
        expect(a.length).toEqual(pushReturnValue);
        expect(pushReturnValue).toEqual(6);
        expect(a.toArray()).toEqual([1, 2, 3, 4, 5, 1]);
    });
    it("Should add single argument - exact capacity", () => {
        const a = new DoubleEndedQueue_1.default([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
        ]);
        expect(a.list.length - a.length).toEqual(1);
        const before = a.length;
        const ret = a.push(1);
        expect(ret).toEqual(before + 1);
        expect(a.length).toEqual(ret);
        expect(ret).toEqual(16);
        expect(a.toArray()).toEqual([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            1
        ]);
    });
    it("Should add single argument - over capacity", () => {
        const a = new DoubleEndedQueue_1.default([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
        ]);
        expect(a.list.length / a.length).toEqual(2);
        const before = a.length;
        const ret = a.push(1);
        expect(ret).toEqual(before + 1);
        expect(a.length).toEqual(ret);
        expect(ret).toEqual(17);
        expect(a.toArray()).toEqual([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            1
        ]);
    });
});
describe("DoubleEndedQueue.unshift", () => {
    it("Should do nothing if no arguments", () => {
        const a = new DoubleEndedQueue_1.default();
        const before = a.length;
        const unshiftReturnValue = a.unshift();
        expect(unshiftReturnValue).toEqual(before);
        expect(a.length).toEqual(unshiftReturnValue);
        expect(unshiftReturnValue).toEqual(0);
    });
    it("Should unshift false-y elements (except undefined)", () => {
        const a = new DoubleEndedQueue_1.default();
        // var before = a.length;
        let unshiftReturnValue = a.unshift(0);
        expect(unshiftReturnValue).toBe(1);
        expect(a.length).toBe(1);
        expect(a.get(0)).toBe(0);
        unshiftReturnValue = a.unshift("");
        expect(unshiftReturnValue).toBe(2);
        expect(a.length).toBe(2);
        expect(a.get(0)).toBe("");
        unshiftReturnValue = a.unshift(null);
        expect(unshiftReturnValue).toBe(3);
        expect(a.length).toBe(3);
        expect(a.get(0)).toBe(null);
    });
    it("Should add single argument - plenty of capacity", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5]);
        expect(a.list.length - a.length).toBeGreaterThan(1);
        const before = a.length;
        const unshiftReturnValue = a.unshift(1);
        expect(unshiftReturnValue).toEqual(before + 1);
        expect(a.length).toEqual(unshiftReturnValue);
        expect(unshiftReturnValue).toEqual(6);
        expect(a.toArray()).toEqual([1, 1, 2, 3, 4, 5]);
    });
    it("Should add single argument - exact capacity", () => {
        const a = new DoubleEndedQueue_1.default([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
        ]);
        expect(a.list.length - a.length).toEqual(1);
        const before = a.length;
        const unshiftReturnValue = a.unshift(1);
        expect(unshiftReturnValue).toEqual(before + 1);
        expect(a.length).toEqual(unshiftReturnValue);
        expect(unshiftReturnValue).toEqual(16);
        expect(a.toArray()).toEqual([
            1,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
        ]);
    });
    it("Should add single argument - over capacity", () => {
        const a = new DoubleEndedQueue_1.default([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
        ]);
        expect(a.list.length / a.length).toEqual(2);
        const before = a.length;
        const unshiftReturnValue = a.unshift(1);
        expect(unshiftReturnValue).toEqual(before + 1);
        expect(a.length).toEqual(unshiftReturnValue);
        expect(unshiftReturnValue).toEqual(17);
        expect(a.toArray()).toEqual([
            1,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
        ]);
    });
});
describe("DoubleEndedQueue.pop", () => {
    it("Should return undefined when empty denque", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length).toEqual(0);
        expect(a.pop()).toEqual(void 0);
        expect(a.pop()).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("Should return the item at the back of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.pop()).toEqual(9);
        expect(a.pop()).toEqual(8);
        b.pop();
        b.pop();
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.pop();
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.pop();
        expect(a.toArray()).toEqual(b);
        expect(a.pop()).toEqual(b.pop());
        expect(a.toArray()).toEqual(b);
    });
});
describe("DoubleEndedQueue.shift", () => {
    it("Should return undefined when empty denque", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length).toEqual(0);
        expect(a.shift()).toEqual(void 0);
        expect(a.shift()).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("Should return the item at the front of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.shift()).toEqual(1);
        expect(a.shift()).toEqual(2);
        b.shift();
        b.shift();
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.shift();
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.shift();
        expect(a.toArray()).toEqual(b);
        expect(a.shift()).toEqual(b.shift());
        expect(a.toArray()).toEqual(b);
    });
});
describe("DoubleEndedQueue.get", () => {
    it("should return undefined on nonsensical argument", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4]);
        expect(a.get(-5)).toEqual(void 0);
        expect(a.get(-100)).toEqual(void 0);
        expect(a.get(void 0)).toEqual(void 0);
        expect(a.get(NaN)).toEqual(void 0);
        expect(a.get(Infinity)).toEqual(void 0);
        expect(a.get(-Infinity)).toEqual(void 0);
        expect(a.get(1.5)).toEqual(void 0);
        expect(a.get(4)).toEqual(void 0);
    });
    it("should support positive indexing", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4]);
        expect(a.get(0)).toEqual(1);
        expect(a.get(1)).toEqual(2);
        expect(a.get(2)).toEqual(3);
        expect(a.get(3)).toEqual(4);
    });
    it("should support negative indexing", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4]);
        expect(a.get(-1)).toEqual(4);
        expect(a.get(-2)).toEqual(3);
        expect(a.get(-3)).toEqual(2);
        expect(a.get(-4)).toEqual(1);
    });
});
describe("DoubleEndedQueue.isEmpty", () => {
    it("should return true on empty denque", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.isEmpty()).toBeTruthy();
    });
    it("should return false on denque with items", () => {
        const a = new DoubleEndedQueue_1.default([1]);
        expect(a.isEmpty()).toBeFalsy();
    });
});
describe("DoubleEndedQueue.peekFront", () => {
    it("Should return undefined when queue is empty", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length).toEqual(0);
        expect(a.peekFront()).toEqual(void 0);
        expect(a.peekFront()).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("should return the item at the front of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(a.peekFront() === 1);
        let l = 5;
        while (l--) {
            a.pop();
        }
        expect(a.toArray()).toEqual([1, 2, 3, 4]);
        expect(a.peekFront()).toEqual(1);
    });
});
describe("DoubleEndedQueue.peekBack", () => {
    it("Should return undefined when queue is empty", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length).toEqual(0);
        expect(a.peekBack()).toEqual(void 0);
        expect(a.peekBack()).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("should return the item at the back of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(a.peekBack()).toEqual(9);
        let l = 5;
        while (l--) {
            a.pop();
        }
        expect(a.toArray()).toEqual([1, 2, 3, 4]);
        expect(a.peekBack()).toEqual(4);
    });
});
describe("DoubleEndedQueue.clear", () => {
    it("should clear the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4]);
        expect(a.isEmpty()).toBeFalsy();
        a.clear();
        expect(a.isEmpty()).toBeTruthy();
    });
});
describe("DoubleEndedQueue.removeOne", () => {
    it("Should return undefined when empty denque", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length === 0);
        expect(a.removeOne(1) === void 0);
        expect(a.length === 0);
    });
});
describe("DoubleEndedQueue.remove", () => {
    it("Should return undefined when empty denque", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length).toEqual(0);
        expect(a.remove(1)).toEqual(void 0);
        expect(a.remove(2, 3)).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("remove from the end of the queue if a negative index is provided", () => {
        const q = new DoubleEndedQueue_1.default();
        q.push(1); // 1
        q.push(2); // 2
        q.push(3); // 3
        expect(q.length).toEqual(3);
        expect(q.remove(-2, 2)).toEqual([2, 3]); // [ 2, 3 ]
        expect(q.length).toEqual(1);
    });
    it("Should return undefined if index or count invalid", () => {
        const a = new DoubleEndedQueue_1.default();
        const b = new DoubleEndedQueue_1.default();
        b.push("foobar");
        b.push("foobaz");
        expect(a.length).toEqual(0);
        expect(b.remove(-1, 0)).toEqual(void 0);
        expect(b.remove(-1, 2).length).toEqual(1);
        expect(b.remove(-5, 1)).toEqual(void 0);
        expect(b.remove(66, 0)).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("Should return the item at the front of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.remove(0, 1)).toEqual(b.splice(0, 1));
        expect(a.remove(0, 1)).toEqual(b.splice(0, 1));
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.remove(0, 1);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(0, 1);
        expect(a.toArray()).toEqual(b);
        expect(a.remove(0, 1)).toEqual(b.splice(0, 1));
        expect(a.toArray()).toEqual(b);
    });
    it("Should return the item at the back of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.remove(8, 1)).toEqual(b.splice(8, 1));
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.remove(20, 1);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(20, 1);
        expect(a.toArray()).toEqual(b);
        expect(a.remove(19, 1)).toEqual(b.splice(19, 1));
        expect(a.toArray()).toEqual(b);
    });
    it("Should return the item somewhere in the middle of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const someArray = [];
        someArray.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.remove(4, 1)).toEqual(someArray.splice(4, 1));
        expect(a.remove(5, 1)).toEqual(someArray.splice(5, 1));
        expect(a.remove(3, 1)).toEqual(someArray.splice(3, 1));
        expect(a.toArray()).toEqual(someArray);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.remove(7, 1);
        someArray.unshift(1, 2, 3, 4, 5);
        someArray.push(1, 2, 3, 4, 5);
        someArray.unshift(1, 2, 3);
        someArray.splice(7, 1);
        expect(a.toArray()).toEqual(someArray);
        expect(a.remove(1, 4)).toEqual(someArray.splice(1, 4));
        expect(a.toArray()).toEqual(someArray);
    });
    it("Should remove a number of items at the front of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.remove(0, 5)).toEqual(b.splice(0, 5));
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.remove(0, 11);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(0, 11);
        expect(a.toArray()).toEqual(b);
        expect(a.remove(0, 1)).toEqual(b.splice(0, 1));
        expect(a.toArray()).toEqual(b);
    });
    it("Should remove a number of items at the back of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.remove(5, 4)).toEqual(b.splice(5, 4));
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.remove(16, 3);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(16, 3);
        expect(a.toArray()).toEqual(b);
        expect(a.remove(5, 100)).toEqual(b.splice(5, 100));
        expect(a.toArray()).toEqual(b);
    });
    it("Should remove a number of items somewhere in the middle of the denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.remove(3, 3)).toEqual(b.splice(3, 3));
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        // console.log(a.toArray())
        a.remove(8, 6);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(8, 6);
        expect(a.toArray()).toEqual(b);
        expect(a.remove(3, 3)).toEqual(b.splice(3, 3));
        expect(a.toArray()).toEqual(b);
    });
    it("Should clear denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        a.remove(0, 9);
        b.splice(0, 9);
        expect(a.toArray()).toEqual(b);
    });
});
describe("DoubleEndedQueue.splice", () => {
    it("Should remove and add items like native splice method at the front of denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.splice(0, 2, 14, 15, 16)).toEqual([1, 2]); // remove then add
        a.splice(0, 0, [11, 12, 13]); // add
        b.splice(0, 2, 14, 15, 16);
        b.splice(0, 0, [11, 12, 13]);
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.splice(0, 0, 17, 18, 19);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(0, 0, 17, 18, 19);
        expect(a.toArray()).toEqual(b);
        expect(a.splice(0, 2)).toEqual(b.splice(0, 2)); // remove
        expect(a.toArray()).toEqual(b);
    });
    it("Should remove and add items like native splice method at the end of denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(a.splice(a.length - 1, 1, 14, 15, 16)).toEqual([9]); // remove then add
        a.splice(a.length, 0, [11, 12, 13]); // add
        b.splice(b.length - 1, 1, 14, 15, 16);
        b.splice(b.length, 0, [11, 12, 13]);
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.splice(a.length, 0, 17, 18, 19);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        b.splice(b.length, 0, 17, 18, 19);
        expect(a.toArray()).toEqual(b);
        a.splice(18, 0, 18, 19);
        b.splice(18, 0, 18, 19);
        expect(a.toArray()).toEqual(b);
        a.splice(21, 0, 1, 2, 3, 4, 5, 6);
        b.splice(21, 0, 1, 2, 3, 4, 5, 6);
        expect(a.toArray()).toEqual(b);
        expect(a.splice(a.length - 1, 2)).toEqual(b.splice(b.length - 1, 2)); // remove
        expect(a.toArray()).toEqual(b);
    });
    it("Should remove and add items like native splice method somewhere in the middle of denque", () => {
        const a = new DoubleEndedQueue_1.default([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const b = [];
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
        a.splice(2, 0, [11, 12, 13]);
        expect(a.splice(7, 2, 14, 15, 16)).toEqual([7, 8]); // remove then add
        expect(a.splice(10, 1, 17, 18)).toEqual([9]);
        b.splice(2, 0, [11, 12, 13]);
        b.splice(7, 2, 14, 15, 16);
        b.splice(10, 1, 17, 18);
        expect(a.toArray()).toEqual(b);
        a.unshift(5);
        a.unshift(4);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        a.push(5);
        a.unshift(3);
        a.unshift(2);
        a.unshift(1);
        b.unshift(1, 2, 3, 4, 5);
        b.push(1, 2, 3, 4, 5);
        b.unshift(1, 2, 3);
        expect(a.splice(3, 3, 16, 15, 14)).toEqual(b.splice(3, 3, 16, 15, 14));
        expect(a.toArray()).toEqual(b);
        expect(a.splice(6, 1)).toEqual(b.splice(6, 1));
        expect(a.toArray()).toEqual(b);
    });
    it("Should return undefined when index or count is invalid", () => {
        const a = new DoubleEndedQueue_1.default();
        const b = new DoubleEndedQueue_1.default();
        b.push("foobar");
        b.push("foobaz");
        expect(a.length).toEqual(0);
        expect(b.splice(-1, 0)).toEqual(void 0);
        expect(b.splice(-5, 1)).toEqual(void 0);
        expect(b.splice(66, 0)).toEqual(void 0);
        expect(a.length).toEqual(0);
    });
    it("Should return undefined when the queue is empty", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.length).toEqual(0);
        expect(a.splice(1, 0)).toEqual(void 0);
    });
    it("Should return undefined when trying to remove further than current size", () => {
        const a = new DoubleEndedQueue_1.default();
        a.push("foobar");
        a.push("foobar1");
        a.push("foobar2");
        a.push("foobar3");
        expect(a.length).toEqual(4);
        expect(a.splice(4, 234)).toEqual(void 0);
    });
    it("Should remove and add items like native splice method to the empty denque", () => {
        const a = new DoubleEndedQueue_1.default();
        expect(a.splice(0, 0, 1)).toEqual([]);
        expect(a.toArray()).toEqual([1]);
        a.clear();
        expect(a.splice(0, 0, 1, 2, 3, 4, 5)).toEqual([]);
        expect(a.toArray()).toEqual([1, 2, 3, 4, 5]);
        a.clear();
        expect(a.splice(0, 1, 1, 2)).toEqual(void 0); // try to add and remove together
        expect(a.toArray()).toEqual([1, 2]);
        const b = new DoubleEndedQueue_1.default([]); // initialized via empty array
        expect(b.splice(0, 0, 1)).toEqual([]);
        expect(b.toArray()).toEqual([1]);
    });
    it("pop should shrink array when mostly empty", () => {
        const a = new DoubleEndedQueue_1.default();
        for (let i = 0; i < 50000; i++) {
            a.push(i);
        }
        const maskA = a.capacityMask;
        for (let ii = 0; ii < 35000; ii++) {
            a.pop();
        }
        const maskB = a.capacityMask;
        expect(maskA > maskB);
    });
});
//# sourceMappingURL=DoubleEndedQueue.test.js.map