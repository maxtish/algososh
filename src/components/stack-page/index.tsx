interface IStack<T> {
  enqueue: (item: T) => void; //Ставить в очередь
  dequeue: () => void; //Удаление из очереди
  clean: () => void; //Очистить очередь
  peak: () => T | null;
  getSize: () => number;
  getItems: () => Array<T>;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  enqueue = (item: T): void => {
    this.container.push(item);
  };

  dequeue = () => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.getSize()) {
      const index = this.getSize() - 1;
      const elem = this.container[index];
      return elem;
    } else {
      return null;
    }
  };

  getSize = () => this.container.length;

  clean = () => {
    this.container = [];
  };

  isEmpty = () => this.container.length === 0;

  getItems = () => this.container;
}
