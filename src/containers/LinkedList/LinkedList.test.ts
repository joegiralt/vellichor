import { LinkedList } from "../LinkedList/LinkedList";
import { chance } from "jest-chance";

test("LinkedList, when initiated,  has correct value and size", () => {
  const someValue = chance.integer();
  const currentLinkedList = new LinkedList(someValue);
  expect(currentLinkedList.head.value).toBe(someValue);
  expect(currentLinkedList.tail.value).toBe(someValue);
  expect(currentLinkedList.tail).toBe(currentLinkedList.head);
  expect(currentLinkedList.size).toBe(1);
});

test("LinkedList can be appended to", () => {
  const initValue = `init value ${chance.integer()}`;
  const valueToBeAppened = `appended value ${chance.integer()}`;
  const currentLinkedList = new LinkedList(initValue);
  expect(currentLinkedList.tail.value).toBe(initValue);
  currentLinkedList.append(valueToBeAppened);
  expect(currentLinkedList.tail.value).toBe(valueToBeAppened);
  expect(currentLinkedList.size).toBe(2);
});

test("LinkedList can be prepended", () => {
  const initValue = `Init value ${chance.integer()}`;
  const valueToBeAppened = `appended value ${chance.integer()}`;
  const currentLinkedList = new LinkedList(initValue);
  expect(currentLinkedList.tail.value).toBe(initValue);
  currentLinkedList.append(valueToBeAppened);
  expect(currentLinkedList.tail.value).toBe(valueToBeAppened);
  expect(currentLinkedList.size).toBe(2);
});

test("LinkedList can be represented as an Array", () => {
  const headValue = `head value ${chance.integer()}`;
  const middleValue = `middle  value ${chance.integer()}`;
  const lastValue = ` last value ${chance.integer()}`;
  const currentLinkedList = new LinkedList(headValue);
  currentLinkedList.append(middleValue);
  currentLinkedList.append(lastValue);

  const asArray = currentLinkedList.asArray();

  expect(currentLinkedList.head.value).toBe(asArray[0]);
  expect(currentLinkedList.tail.value).toBe(
    asArray[currentLinkedList.size - 1]
  );
});

test("LinkedList can have a value inserted at a particular index", () => {
  const headValue = `head value ${chance.integer()}`;
  const valueToBeInserted = `inserted value ${chance.integer()}`;
  const currentLinkedList = new LinkedList(headValue);
  const wordListLength = chance.integer({ min: 5, max: 20 });
  const insertionIndex = chance.integer({ min: 2, max: wordListLength });
  const words = chance.sentence({ words: wordListLength }).split(" ");

  words.forEach((word: string) => currentLinkedList.append(word));
  const linkedListAsArray = currentLinkedList
    .insert(insertionIndex, valueToBeInserted)
    .asArray();

  expect(linkedListAsArray[insertionIndex]).toBe(valueToBeInserted);
});

test("LinkedList can have a value removed at a particular index", () => {
  const headValue = `head value ${chance.integer()}`;
  const currentLinkedList = new LinkedList(headValue);
  const wordListLength = chance.integer({ min: 5, max: 20 });
  const removeIndex = chance.integer({ min: 2, max: wordListLength });
  const words = chance.sentence({ words: wordListLength }).split(" ");

  words.forEach((word: string) => currentLinkedList.append(word));

  const leaderNode = currentLinkedList.traverseToIndex(removeIndex - 1);
  const nextNodeAfterRemoval = leaderNode.next.next;

  currentLinkedList.remove(removeIndex);
  expect(leaderNode.next).toBe(nextNodeAfterRemoval);
});

test("LinkedList can be reversed", () => {
  const wordListLength = chance.integer({ min: 5, max: 20 });
  const words = chance.sentence({ words: wordListLength }).split(" ");
  const [firstWord, ...rest] = words;
  const currentLinkedList = new LinkedList(firstWord);
  rest.forEach((word: string) => currentLinkedList.append(word));

  expect(words.reverse().toString()).toEqual(
    currentLinkedList
      .reverse()
      .asArray()
      .toString()
  );
});

test("LinkedList can traverse to a particular index", () => {
  const headValue = `head value ${chance.integer()}`;
  const valueToBeInserted = `inserted value ${chance.integer()}`;
  const currentLinkedList = new LinkedList(headValue);
  const wordListLength = chance.integer({ min: 5, max: 20 });
  const insertionIndex = chance.integer({ min: 2, max: wordListLength });
  const words = chance.sentence({ words: wordListLength }).split(" ");

  words.forEach((word: string) => currentLinkedList.append(word));
  const listNode = currentLinkedList
    .insert(insertionIndex, valueToBeInserted)
    .traverseToIndex(insertionIndex);

  expect(listNode.value).toBe(valueToBeInserted);
});
