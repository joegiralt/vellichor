"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_chance_1 = require("jest-chance");
const LinkedList_1 = __importDefault(require("../LinkedList/LinkedList"));
test("LinkedList, when initiated,  has correct value and size", () => {
    const someValue = jest_chance_1.chance.integer();
    const currentLinkedList = new LinkedList_1.default(someValue);
    expect(currentLinkedList.head.value).toBe(someValue);
    expect(currentLinkedList.tail.value).toBe(someValue);
    expect(currentLinkedList.tail).toBe(currentLinkedList.head);
    expect(currentLinkedList.size).toBe(1);
});
test("LinkedList can be appended to", () => {
    const initValue = `init value ${jest_chance_1.chance.integer()}`;
    const valueToBeAppened = `appended value ${jest_chance_1.chance.integer()}`;
    const currentLinkedList = new LinkedList_1.default(initValue);
    expect(currentLinkedList.tail.value).toBe(initValue);
    currentLinkedList.append(valueToBeAppened);
    expect(currentLinkedList.tail.value).toBe(valueToBeAppened);
    expect(currentLinkedList.size).toBe(2);
});
test("LinkedList can be prepended", () => {
    const initValue = `Init value ${jest_chance_1.chance.integer()}`;
    const valueToBePrepened = `appended value ${jest_chance_1.chance.integer()}`;
    const currentLinkedList = new LinkedList_1.default(initValue);
    expect(currentLinkedList.tail.value).toBe(initValue);
    currentLinkedList.prepend(valueToBePrepened);
    expect(currentLinkedList.head.value).toBe(valueToBePrepened);
    expect(currentLinkedList.size).toBe(2);
});
test("LinkedList can be represented as an Array", () => {
    const headValue = `head value ${jest_chance_1.chance.integer()}`;
    const middleValue = `middle  value ${jest_chance_1.chance.integer()}`;
    const lastValue = ` last value ${jest_chance_1.chance.integer()}`;
    const currentLinkedList = new LinkedList_1.default(headValue);
    currentLinkedList.append(middleValue);
    currentLinkedList.append(lastValue);
    const asArray = currentLinkedList.asArray();
    expect(currentLinkedList.head.value).toBe(asArray[0]);
    expect(currentLinkedList.tail.value).toBe(asArray[currentLinkedList.size - 1]);
});
test("LinkedList can have a value inserted at a particular index", () => {
    const headValue = `head value ${jest_chance_1.chance.integer()}`;
    const valueToBeInserted = `inserted value ${jest_chance_1.chance.integer()}`;
    const currentLinkedList = new LinkedList_1.default(headValue);
    const wordListLength = jest_chance_1.chance.integer({ min: 5, max: 20 });
    const insertionIndex = jest_chance_1.chance.integer({ min: 2, max: wordListLength });
    const words = jest_chance_1.chance.sentence({ words: wordListLength }).split(" ");
    words.forEach((word) => currentLinkedList.append(word));
    const linkedListAsArray = currentLinkedList
        .insert(insertionIndex, valueToBeInserted)
        .asArray();
    expect(linkedListAsArray[insertionIndex]).toBe(valueToBeInserted);
});
test("LinkedList can have a value removed at a particular index", () => {
    const headValue = `head value ${jest_chance_1.chance.integer()}`;
    const currentLinkedList = new LinkedList_1.default(headValue);
    const wordListLength = jest_chance_1.chance.integer({ min: 10, max: 20 });
    const removeIndex = jest_chance_1.chance.integer({ min: 7, max: wordListLength });
    const words = jest_chance_1.chance.sentence({ words: wordListLength }).split(" ");
    words.forEach((word) => currentLinkedList.append(word));
    const leaderNode = currentLinkedList.traverseToIndex(removeIndex - 1);
    const nextNodeAfterRemoval = leaderNode.next.next;
    currentLinkedList.remove(removeIndex);
    expect(leaderNode.next).toBe(nextNodeAfterRemoval);
});
test("LinkedList can be reversed", () => {
    const wordListLength = jest_chance_1.chance.integer({ min: 5, max: 20 });
    const words = jest_chance_1.chance.sentence({ words: wordListLength }).split(" ");
    const [firstWord, ...rest] = words;
    const currentLinkedList = new LinkedList_1.default(firstWord);
    rest.forEach((word) => currentLinkedList.append(word));
    expect(words.reverse().toString()).toEqual(currentLinkedList
        .reverse()
        .asArray()
        .toString());
});
test("LinkedList can traverse to a particular index", () => {
    const headValue = `head value ${jest_chance_1.chance.integer()}`;
    const valueToBeInserted = `inserted value ${jest_chance_1.chance.integer()}`;
    const currentLinkedList = new LinkedList_1.default(headValue);
    const wordListLength = jest_chance_1.chance.integer({ min: 5, max: 20 });
    const insertionIndex = jest_chance_1.chance.integer({ min: 2, max: wordListLength });
    const words = jest_chance_1.chance.sentence({ words: wordListLength }).split(" ");
    words.forEach((word) => currentLinkedList.append(word));
    const listNode = currentLinkedList
        .insert(insertionIndex, valueToBeInserted)
        .traverseToIndex(insertionIndex);
    expect(listNode.value).toBe(valueToBeInserted);
});
test("LinkedList reversed empty does nothing", () => {
    const currentLinkedList = new LinkedList_1.default("HI");
    expect(currentLinkedList.reverse()).toBe(currentLinkedList);
});
test("LinkedList append value is still appened if target index is too high", () => {
    const currentLinkedList = new LinkedList_1.default("HI");
    const newValue = "bye";
    currentLinkedList.insert(1000000, newValue);
    expect(currentLinkedList.tail.value).toBe(newValue);
});
//# sourceMappingURL=LinkedList.test.js.map