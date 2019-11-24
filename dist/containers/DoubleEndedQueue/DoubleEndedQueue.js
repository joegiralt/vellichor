"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom implementation of a double ended queue.
 */
class DoubleEndedQueue {
    constructor(array = []) {
        this.head = 0;
        this.tail = 0;
        this.capacityMask = 0x3;
        this.list = new Array(4);
        if (Array.isArray(array) && array.length !== 0) {
            this.fromArray(array);
        }
    }
    /**
     * Returns the item at the specified index from the list.
     * 0 is the first element, 1 is the second, and so on...
     * Elements at negative values are that many from the end: -1 is one before the end
     * (the last element), -2 is two before the end (one before last), etc.
     * @param {number} index
     * @returns {*}
     */
    peekAt(index) {
        let idx = index;
        // expect a number or return undefined
        if (idx !== (idx | 0)) {
            return void 0;
        }
        const len = this.size();
        if (idx >= len || idx < -len) {
            return undefined;
        }
        if (idx < 0) {
            idx += len;
        }
        idx = (this.head + idx) & this.capacityMask;
        return this.list[idx];
    }
    /**
     * Alias for peekAt()
     * @param {number} index
     * @returns {*}
     */
    get(index) {
        return this.peekAt(index);
    }
    /**
     * Returns the first item in the list without removing it.
     * @returns {*}
     */
    peek() {
        if (this.head === this.tail) {
            return undefined;
        }
        return this.list[this.head];
    }
    /**
     * Alias for peek()
     * @returns {*}
     */
    peekFront() {
        return this.peek();
    }
    /**
     * Returns the item that is at the back of the queue without removing it.
     * Uses peekAt(-1)
     */
    peekBack() {
        return this.peekAt(-1);
    }
    /**
     * Returns the current length of the queue
     * @return {Number}
     */
    get length() {
        return this.size();
    }
    /**
     * Return the number of items on the list, or 0 if empty.
     * @returns {number}
     */
    size() {
        if (this.head === this.tail) {
            return 0;
        }
        if (this.head < this.tail) {
            return this.tail - this.head;
        }
        else {
            return this.capacityMask + 1 - (this.head - this.tail);
        }
    }
    /**
     * Add an item at the beginning of the list.
     * @param item
     */
    unshift(item) {
        if (item === undefined) {
            return this.size();
        }
        const len = this.list.length;
        this.head = (this.head - 1 + len) & this.capacityMask;
        this.list[this.head] = item;
        if (this.tail === this.head) {
            this.growArray();
        }
        if (this.head < this.tail) {
            return this.tail - this.head;
        }
        else {
            return this.capacityMask + 1 - (this.head - this.tail);
        }
    }
    /**
     * Remove and return the first item on the list,
     * Returns undefined if the list is empty.
     * @returns {*}
     */
    shift() {
        const head = this.head;
        if (head === this.tail) {
            return undefined;
        }
        const item = this.list[head];
        this.list[head] = undefined;
        this.head = (head + 1) & this.capacityMask;
        if (head < 2 && this.tail > 10000 && this.tail <= this.list.length >>> 2) {
            this.shrinkArray();
        }
        return item;
    }
    /**
     * Add an item to the bottom of the list.
     * @param item
     */
    push(item) {
        if (item === undefined) {
            return this.size();
        }
        const tail = this.tail;
        this.list[tail] = item;
        this.tail = (tail + 1) & this.capacityMask;
        if (this.tail === this.head) {
            this.growArray();
        }
        if (this.head < this.tail) {
            return this.tail - this.head;
        }
        else {
            return this.capacityMask + 1 - (this.head - this.tail);
        }
    }
    /**
     * Remove and return the last item on the list.
     * Returns undefined if the list is empty.
     * @returns {*}
     */
    pop() {
        const tail = this.tail;
        if (tail === this.head) {
            return undefined;
        }
        const len = this.list.length;
        this.tail = (tail - 1 + len) & this.capacityMask;
        const item = this.list[this.tail];
        this.list[this.tail] = undefined;
        if (this.head < 2 && tail > 10000 && tail <= len >>> 2) {
            this.shrinkArray();
        }
        return item;
    }
    /**
     * Remove and return the item at the specified index from the list.
     * Returns undefined if the list is empty.
     * @param index
     * @returns {*}
     */
    removeOne(index) {
        let idx = index;
        // expect a number or return undefined
        if (idx !== (idx | 0)) {
            return void 0;
        }
        if (this.head === this.tail) {
            return void 0;
        }
        const size = this.size();
        const len = this.list.length;
        if (idx >= size || idx < -size) {
            return void 0;
        }
        if (idx < 0) {
            idx += size;
        }
        idx = (this.head + idx) & this.capacityMask;
        const item = this.list[idx];
        let k;
        if (index < size / 2) {
            for (k = index; k > 0; k--) {
                this.list[idx] = this.list[(idx = (idx - 1 + len) & this.capacityMask)];
            }
            this.list[idx] = void 0;
            this.head = (this.head + 1 + len) & this.capacityMask;
        }
        else {
            for (k = size - 1 - index; k > 0; k--) {
                this.list[idx] = this.list[(idx = (idx + 1 + len) & this.capacityMask)];
            }
            this.list[idx] = void 0;
            this.tail = (this.tail - 1 + len) & this.capacityMask;
        }
        return item;
    }
    /**
     * Remove number of items from the specified index from the list.
     * Returns array of removed items.
     * Returns undefined if the list is empty.
     * @param index
     * @param count
     * @returns {array}
     */
    remove(index, count) {
        let idx = index;
        let removed;
        let deletionCount = count;
        // expect a number or return undefined
        if (idx !== (idx | 0)) {
            return void 0;
        }
        if (this.head === this.tail) {
            return void 0;
        }
        const size = this.size();
        const len = this.list.length;
        if (idx >= size || idx < -size || count < 1) {
            return void 0;
        }
        if (idx < 0) {
            idx += size;
        }
        if (count === 1 || !count) {
            removed = new Array(1);
            removed[0] = this.removeOne(idx);
            return removed;
        }
        if (idx === 0 && idx + count >= size) {
            removed = this.toArray();
            this.clear();
            return removed;
        }
        if (idx + count > size) {
            count = size - idx;
        }
        let k;
        removed = new Array(count);
        for (k = 0; k < count; k++) {
            removed[k] = this.list[(this.head + idx + k) & this.capacityMask];
        }
        idx = (this.head + idx) & this.capacityMask;
        if (index + count === size) {
            this.tail = (this.tail - count + len) & this.capacityMask;
            for (k = count; k > 0; k--) {
                this.list[(idx = (idx + 1 + len) & this.capacityMask)] = void 0;
            }
            return removed;
        }
        if (index === 0) {
            this.head = (this.head + count + len) & this.capacityMask;
            for (k = count - 1; k > 0; k--) {
                this.list[(idx = (idx + 1 + len) & this.capacityMask)] = void 0;
            }
            return removed;
        }
        if (idx < size / 2) {
            this.head = (this.head + index + count + len) & this.capacityMask;
            for (k = index; k > 0; k--) {
                this.unshift(this.list[(idx = (idx - 1 + len) & this.capacityMask)]);
            }
            idx = (this.head - 1 + len) & this.capacityMask;
            while (deletionCount > 0) {
                this.list[(idx = (idx - 1 + len) & this.capacityMask)] = void 0;
                deletionCount--;
            }
            if (index < 0) {
                this.tail = idx;
            }
        }
        else {
            this.tail = idx;
            idx = (idx + count + len) & this.capacityMask;
            for (k = size - (count + index); k > 0; k--) {
                this.push(this.list[idx++]);
            }
            idx = this.tail;
            while (deletionCount > 0) {
                this.list[(idx = (idx + 1 + len) & this.capacityMask)] = void 0;
                deletionCount--;
            }
        }
        if (this.head < 2 && this.tail > 10000 && this.tail <= len >>> 2) {
            this.shrinkArray();
        }
        return removed;
    }
    /**
     * Native splice implementation.
     * Remove number of items from the specified index from the list and/or add new elements.
     * Returns array of removed items or empty array if count == 0.
     * Returns undefined if the list is empty.
     *
     * @param index
     * @param count
     * @param {...*} [elements]
     * @returns {array}
     */
    splice(index, count, ...extraArgs) {
        let idx = index;
        // expect a number or return undefined
        if (idx !== (idx | 0)) {
            return void 0;
        }
        const size = this.size();
        if (idx < 0) {
            idx += size;
        }
        if (idx > size) {
            return void 0;
        }
        if (extraArgs.length > 0) {
            let k;
            let temp;
            let removed;
            let argumentsLength = extraArgs.length;
            const len = this.list.length;
            let argumentsIndex = 0;
            if (!size || idx < size / 2) {
                temp = new Array(idx);
                for (k = 0; k < idx; k++) {
                    temp[k] = this.list[(this.head + k) & this.capacityMask];
                }
                if (count === 0) {
                    removed = [];
                    if (idx > 0) {
                        this.head = (this.head + idx + len) & this.capacityMask;
                    }
                }
                else {
                    removed = this.remove(idx, count);
                    this.head = (this.head + idx + len) & this.capacityMask;
                }
                while (argumentsLength > argumentsIndex) {
                    this.unshift(extraArgs[--argumentsLength]);
                }
                for (k = idx; k > 0; k--) {
                    this.unshift(temp[k - 1]);
                }
            }
            else {
                temp = new Array(size - (idx + count));
                const tempLength = temp.length;
                for (k = 0; k < tempLength; k++) {
                    temp[k] = this.list[(this.head + idx + count + k) & this.capacityMask];
                }
                if (count === 0) {
                    removed = [];
                    if (idx !== size) {
                        this.tail = (this.head + idx + len) & this.capacityMask;
                    }
                }
                else {
                    removed = this.remove(idx, count);
                    this.tail = (this.tail - tempLength + len) & this.capacityMask;
                }
                while (argumentsIndex < argumentsLength) {
                    this.push(extraArgs[argumentsIndex++]);
                }
                for (k = 0; k < tempLength; k++) {
                    this.push(temp[k]);
                }
            }
            return removed;
        }
        else {
            return this.remove(idx, count);
        }
    }
    /**
     * Soft clear - does not reset capacity.
     */
    clear() {
        this.head = 0;
        this.tail = 0;
    }
    /**
     * Returns true or false whether the list is empty.
     * @returns {boolean}
     */
    isEmpty() {
        return this.head === this.tail;
    }
    /**
     * Returns an array of all queue items.
     * @returns {Array}
     */
    toArray() {
        return this.copyArray(false);
    }
    /**
     * -------------
     *   INTERNALS
     * -------------
     */
    /**
     * Fills the queue with items from an array
     * For use in the constructor
     * @param array
     * @private
     */
    fromArray(array) {
        for (let idx = 0, len = array.length; idx < len; idx++) {
            this.push(array[idx]);
        }
    }
    /**
     *
     * @param fullCopy
     * @returns {Array}
     * @private
     */
    copyArray(fullCopy) {
        const newArray = [];
        const list = this.list;
        const len = list.length;
        let i;
        if (fullCopy || this.head > this.tail) {
            for (i = this.head; i < len; i++) {
                newArray.push(list[i]);
            }
            for (i = 0; i < this.tail; i++) {
                newArray.push(list[i]);
            }
        }
        else {
            for (i = this.head; i < this.tail; i++) {
                newArray.push(list[i]);
            }
        }
        return newArray;
    }
    /**
     * Grows the internal list array.
     * @private
     */
    growArray() {
        if (this.head) {
            // copy existing data, head to end, then beginning to tail.
            this.list = this.copyArray(true);
            this.head = 0;
        }
        // head is at 0 and array is now full, safe to extend
        this.tail = this.list.length;
        this.list.length *= 2;
        this.capacityMask = (this.capacityMask << 1) | 1;
    }
    /**
     * Shrinks the internal list array.
     * @private
     */
    shrinkArray() {
        this.list.length >>>= 1;
        this.capacityMask >>>= 1;
    }
}
exports.default = DoubleEndedQueue;
//# sourceMappingURL=DoubleEndedQueue.js.map