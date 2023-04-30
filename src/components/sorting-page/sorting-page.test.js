import { Direction } from "../../types/direction";
import { selectionSort, bubbleSort } from "./sorting-page";
import { ElementStates } from "../../types/element-states";

const initialValue = [
  {
    item: "4",
    state: ElementStates.Default,
  },
  {
    item: "1",
    state: ElementStates.Default,
  },
  {
    item: "3",
    state: ElementStates.Default,
  },
  {
    item: "2",
    state: ElementStates.Default,
  },
];

const finalValueAscending = [
  {
    item: "1",
    state: ElementStates.Modified,
  },
  {
    item: "2",
    state: ElementStates.Modified,
  },
  {
    item: "3",
    state: ElementStates.Modified,
  },
  {
    item: "4",
    state: ElementStates.Modified,
  },
];

const finalValueDescending = [
  {
    item: "4",
    state: ElementStates.Modified,
  },
  {
    item: "3",
    state: ElementStates.Modified,
  },
  {
    item: "2",
    state: ElementStates.Modified,
  },
  {
    item: "1",
    state: ElementStates.Modified,
  },
];

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  //выбором
  it("Корректно сортирует выбором: пустой массив", async () => {
    const arr = await selectionSort([], Direction.Ascending);
    expect(arr).toEqual(null);
  });

  it("Корректно сортирует выбором: массив из одного элемента", async () => {
    const arr = await selectionSort(
      [
        {
          item: "1",
          state: ElementStates.Modified,
        },
      ],
      Direction.Ascending
    );
    expect(arr).toEqual(null);
  });

  it("Корректно сортирует выбором по возрастанию: массив из нескольких элементов", async () => {
    const arr = await selectionSort(initialValue, Direction.Ascending);
    expect(arr).toEqual(finalValueAscending);
  }, 10000);

  it("Корректно сортирует выбором по убыванию: массив из нескольких элементов", async () => {
    const arr = await selectionSort(initialValue, Direction.Descending);
    expect(arr).toEqual(finalValueDescending);
  }, 10000);

  //пузырьком
  it("Корректно сортирует пузырьком: пустой массив", async () => {
    const arr = await bubbleSort([], Direction.Ascending);
    expect(arr).toEqual(null);
  });

  it("Корректно сортирует пузырьком: массив из одного элемента", async () => {
    const arr = await bubbleSort(
      [
        {
          item: "1",
          state: ElementStates.Modified,
        },
      ],
      Direction.Ascending
    );
    expect(arr).toEqual(null);
  });

  it("Корректно сортирует пузырьком по возрастанию: массив из нескольких элементов", async () => {
    const arr = await bubbleSort(initialValue, Direction.Ascending);
    expect(arr).toEqual(finalValueAscending);
  }, 10000);

  it("Корректно сортирует пузырьком по убыванию: массив из нескольких элементов", async () => {
    const arr = await bubbleSort(initialValue, Direction.Descending);
    expect(arr).toEqual(finalValueDescending);
  }, 10000);
});
