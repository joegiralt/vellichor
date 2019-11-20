class ListNode {
  value: any;
  next: ListNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

/**
 *  Implements a singlely LinkedList
 *
 */
export class LinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  size: number;

  /**
   *  creates a LinkedList
   *  @complexity {O(1)}
   */
  constructor(value: any) {
    this.head = new ListNode(value);
    this.tail = this.head;
    this.size = 1;
  }

  /**
   *  Appends a new value to the tail of the LinkedList
   *  @complexity {O(1)}
   */
  append(value: any): LinkedList {
    const newNode = new ListNode(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return this;
  }

  /**
   *  Prepends a new value to the head of the LinkedList
   *  @complexity {O(1)}
   */
  prepend(value: any) {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this;
  }

  /**
   *  Maps the values to an array, `head.value` is at the 0th index and the `tail.value` is at the ultimate index
   *  @complexity {O(n)}
   */
  asArray(): Array<any> {
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
   *  @complexity {O(n)}
   */
  insert(index: number, value: any) {
    if (index >= this.size) {
      return this.append(value);
    }

    const newNode = new ListNode(value);

    const leader = this.traverseToIndex(index - 1);
    const holdingPointer = leader.next;
    leader.next = newNode;
    newNode.next = holdingPointer;
    this.size++;
    return this.asArray();
  }

  /**
   *  traverse to a node at a particular index
   *  @returns {ListNode}
   *  @complexity {O(n)}
   */
  traverseToIndex(index: number): ListNode {
    let counter = 0;
    let currentNode = this.head;
    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }
  remove(index: number) {
    // Check Parameters
    const leader = this.traverseToIndex(index - 1);
    const unwantedNode = leader.next;
    leader.next = unwantedNode.next;
    this.size--;
    return this.asArray();
  }
  reverse() {
    if (!this.head.next) {
      return this.head;
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
    return this.asArray();
  }
}
