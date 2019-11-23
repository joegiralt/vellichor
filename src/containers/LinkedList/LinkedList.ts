import ListNode from "./ListNode";
/**
 *  Implements a singly linked list.
 *  {@link https://en.wikipedia.org/wiki/Linked_list} Linked list - Wikipedia
 *
 */
export class LinkedList {
  public head: ListNode | null;
  public tail: ListNode | null;
  public size: number;

  /**
   *  Creates a LinkedList.
   *  @param {*} value A value.
   *  @time O(1)
   */
  constructor(value: any) {
    this.head = new ListNode(value);
    this.tail = this.head;
    this.size = 1;
  }

  /**
   *  Appends a new value to the tail of the LinkedList.
   *  @param {*} value
   *  @time O(1)
   *  @return {LinkedList} this instance.
   */
  public append(value: any): LinkedList {
    const newNode = new ListNode(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return this;
  }

  /**
   *  Prepends a new value to the head of the LinkedList.
   *  @param {*} value
   *  @time O(1)
   *  @return {LinkedList} this instance.
   */
  public prepend(value: any): LinkedList {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this;
  }

  /**
   *  Maps the values to an array, `head.value` is at the 0th index and the `tail.value` is at the ultimate index.
   *  @time O(n)
   *  @return {any[]} An array of node values.
   */
  public asArray(): any[] {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  /**
   *  Inserts a value at a particular index
   *  @time O(n)
   *  @param {number} index
   *  @param {any} value
   *  @return {LinkedList} this instance.
   */
  public insert(index: number, value: any): LinkedList {
    if (index >= this.size) {
      return this.append(value);
    }

    const newNode = new ListNode(value);

    const leader = this.traverseToIndex(index - 1);
    const holdingPointer = leader.next;
    leader.next = newNode;
    newNode.next = holdingPointer;
    this.size++;
    return this;
  }

  /**
   *  Removes a node at a particular index.
   *  @param {number} index
   *  @time O(n)
   *  @return {LinkedList} this instance.
   */
  public remove(index: number): LinkedList {
    const leader = this.traverseToIndex(index - 1);
    const unwantedNode = leader.next;
    leader.next = unwantedNode.next;
    this.size--;
    return this;
  }

  /**
   *  Reverse a LinkedList in place.
   *  @time O(n)
   *  @return {LinkedList} this instance.
   */
  public reverse(): LinkedList {
    if (!this.head.next) {
      return this;
    }
    let first = this.head;
    this.tail = this.head;
    let second = first.next;

    while (second) {
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }

    this.head.next = null;
    this.head = first;
    return this;
  }

  /**
   *  Traverses to a node at a particular index.
   *  @time O(n)
   *  @param {number} index
   *  @return {LinkedNode} List Node is returned
   */
  public traverseToIndex(index: number): ListNode {
    let counter = 0;
    let currentNode = this.head;
    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }
}
