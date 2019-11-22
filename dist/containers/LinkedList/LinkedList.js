"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListNode_1 = __importDefault(require("./ListNode"));
/**
 *  Implements a singly linked list.
 *  @class LinkedList
 *  @link https://en.wikipedia.org/wiki/Linked_list
 *
 */
class LinkedList {
    /**
     *  Creates a LinkedList.
     *  @param {*} value
     *  @time O(1)
     */
    constructor(value) {
        this.head = new ListNode_1.default(value);
        this.tail = this.head;
        this.size = 1;
    }
    /**
     *  Appends a new value to the tail of the LinkedList.
     *  @param {*} value
     *  @time O(1)
     *  @return this
     */
    append(value) {
        const newNode = new ListNode_1.default(value);
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
    prepend(value) {
        const newNode = new ListNode_1.default(value);
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
    asArray() {
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
    insert(index, value) {
        if (index >= this.size) {
            return this.append(value);
        }
        const newNode = new ListNode_1.default(value);
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
    traverseToIndex(index) {
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
    remove(index) {
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
    reverse() {
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
exports.LinkedList = LinkedList;
//# sourceMappingURL=LinkedList.js.map