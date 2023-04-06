export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(array?: Array<T>) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (array) {
      for (let i = 0; i < array.length; i++) {
        this.append(array[i]);
      }
    }
  }
  //Добавить по индексу
  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1) {
          curr = curr!.next;
          currIndex++;
        }

        node.next = curr!.next;
        curr!.next = node;
      }
    }

    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    this.size++;
  }

  getSize() {
    return this.size;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
  }

  deleteTail() {
    if (!this.head) {
      return null;
    }

    if (!this.head.next) {
      this.head = null;
    }

    let prev = this.head;
    let node = this.head?.next;

    while (node?.next) {
      prev = node;
      node = node.next;
    }
    prev!.next = null;

    this.size--;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    if (index === 0) {
      this.deleteHead();
      return;
    }
    if (index === this.size - 1) {
      this.deleteTail();
      return;
    }

    let counter = 0;
    let node = this.head as Node<T>;

    while (counter !== index - 1 && node.next) {
      counter++;
      node = node.next;
    }

    node.next = node.next!.next;

    this.size--;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  toArray() {
    let curr = this.head;
    let array: Array<T> = [];

    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }

    return array;
  }
}
