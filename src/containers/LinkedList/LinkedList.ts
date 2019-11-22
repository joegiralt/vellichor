import ListNode from "./ListNode";
/**
 *  Implements a singly linked list.
 *  @class LinkedList
 *  @link https://en.wikipedia.org/wiki/Linked_list
 *
 */
export class LinkedList {
  public head: ListNode | null;
  public tail: ListNode | null;
  public size: number;

  /**
   *  Creates a LinkedList.
   *  @param {*} value
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
   *  @return this
   */
  public append(value: any): this {
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
   *  @return this
   */
  public prepend(value: any): this {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this;
  }

  /**
   *  Maps the values to an array, `head.value` is at the 0th index and the `tail.value` is at the ultimate index.
   *  @time O(n)
   *  @return {any[]} an array of node values
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
   *  @return this
   */
  public insert(index: number, value: any): this {
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
   *  Traverse to a node at a particular index.
   *  @time O(n)
   *  @param {number} index
   *  @return ListNode
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

  /**
   *  Removes a node at a particular index.
   *  @param {number} index
   *  @time O(n)
   *  @return this
   */
  public remove(index: number) {
    const leader = this.traverseToIndex(index - 1);
    const unwantedNode = leader.next;
    leader.next = unwantedNode.next;
    this.size--;
    return this;
  }

  /**
   *  Reverse a LinkedList in place.
   *  @time O(n)
   *  @return this
   */
  public reverse() {
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
}
