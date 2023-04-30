import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";

type TMainArray = Array<{ item: number; state: ElementStates }>;
type TButState = {
  radioInput: boolean;
  butAsc: boolean;
  butDes: boolean;
  butNewArr: boolean;
  butAscLoad: boolean;
  butDesLoad: boolean;
};

const swap = (
  arr: Array<{ item: number; state: ElementStates }>,

  firstIndex: number,
  secondIndex: number,
  setArray?: Dispatch<SetStateAction<TMainArray>>
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  setArray && setArray(arr);
};

export const selectionSort = async (
  arr: TMainArray,
  direction: Direction,
  setArray?: Dispatch<SetStateAction<TMainArray>>
) => {
  const { length } = arr;
  if (length === 0 || length === 1) {
    return null;
  } else {
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;

      for (let j = i; j < length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setArray && setArray([...arr]);
        await delay(1000);
        if (direction === Direction.Descending) {
          if (arr[maxInd].item < arr[j].item) {
            maxInd = j;
          }
        } else if (direction === Direction.Ascending) {
          if (arr[maxInd].item > arr[j].item) {
            maxInd = j;
          }
        }
        arr[j].state = ElementStates.Default;
        setArray && setArray([...arr]);
      }

      swap(arr, i, maxInd, setArray);
      arr[i].state = ElementStates.Modified;
    }
    arr[length - 1].state = ElementStates.Modified;
    setArray && setArray([...arr]);

    return arr;
  }
};

export const bubbleSort = async (
  arr: TMainArray,
  direction: Direction,
  setArray?: Dispatch<SetStateAction<TMainArray>>
) => {
  const { length } = arr;
  if (length === 0 || length === 1) {
    return null;
  } else {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArray && setArray([...arr]);
        await delay(1000);

        if (direction === Direction.Ascending) {
          if (arr[j].item > arr[j + 1].item) {
            // сортируем элементы по возрастанию
            swap(arr, j, j + 1, setArray);
          }
        } else if (direction === Direction.Descending) {
          if (arr[j].item < arr[j + 1].item) {
            // сортируем элементы по возрастанию
            swap(arr, j, j + 1, setArray);
          }
        }

        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;

        setArray && setArray([...arr]);
      }

      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray && setArray([...arr]);
    }
    return arr;
  }
};

export const SortingPage: React.FC = () => {
  let arr: Array<{ item: number; state: ElementStates }> = [];
  const [butState, setButState] = useState<TButState>({
    radioInput: false,
    butAsc: false,
    butAscLoad: false,
    butDes: false,
    butDesLoad: false,
    butNewArr: false,
  });

  const getRandomInt = (minimum: number, maximum: number) => {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
  };

  const randomArr = () => {
    const lenArr: number = getRandomInt(3, 17);
    for (let i = 0; i < lenArr; i++) {
      arr.push({ item: getRandomInt(0, 100), state: ElementStates.Default });
    }
    return arr;
  };

  const [mainArray, setMainArray] = useState<TMainArray>([]);
  const [checked, setChecked] = useState<string>("select");

  const newRandomArr = () => {
    setMainArray(randomArr());
  };

  // Начальное значение
  useEffect(() => {
    setMainArray(randomArr());
  }, []);

  const sortDescending = async () => {
    if (mainArray.length > 0) {
      setButState({
        radioInput: true,
        butAsc: true,
        butAscLoad: false,
        butDes: false,
        butDesLoad: true,
        butNewArr: true,
      });
      if (checked === "select") {
        await selectionSort(mainArray, Direction.Descending, setMainArray);
      }
      if (checked === "bubble") {
        await bubbleSort(mainArray, Direction.Descending, setMainArray);
      }
      setButState({
        radioInput: false,
        butAsc: false,
        butAscLoad: false,
        butDes: false,
        butDesLoad: false,
        butNewArr: false,
      });
    }
  };

  const sortAscending = async () => {
    if (mainArray.length > 0) {
      setButState({
        radioInput: true,
        butAsc: false,
        butAscLoad: true,
        butDes: true,
        butDesLoad: false,
        butNewArr: true,
      });
      if (checked === "select") {
        await selectionSort(mainArray, Direction.Ascending, setMainArray);
      }
      if (checked === "bubble") {
        await bubbleSort(mainArray, Direction.Ascending, setMainArray);
      }
      setButState({
        radioInput: false,
        butAsc: false,
        butAscLoad: false,
        butDes: false,
        butDesLoad: false,
        butNewArr: false,
      });
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.method}>
          <RadioInput
            value="select"
            checked={checked === "select"}
            onChange={() => setChecked("select")}
            label="Выбор"
            disabled={butState.radioInput}
          />
          <RadioInput
            value="bubble"
            checked={checked === "bubble"}
            onChange={() => setChecked("bubble")}
            label="Пузырёк"
            disabled={butState.radioInput}
          />
        </div>
        <div className={styles.sort}>
          <Button
            text="По возрастанию"
            type="button"
            disabled={butState.butAsc}
            onClick={sortAscending}
            isLoader={butState.butAscLoad}
            sorting={Direction.Ascending}
          />
          <Button
            text="По убыванию"
            type="button"
            disabled={butState.butDes}
            isLoader={butState.butDesLoad}
            onClick={sortDescending}
            sorting={Direction.Descending}
          />
        </div>
        <Button
          text="Новый массив"
          type="button"
          disabled={butState.butNewArr}
          onClick={newRandomArr}
        />
      </div>
      {mainArray && (
        <ul className={styles.list}>
          {mainArray.map((item, index) => (
            <li key={index}>
              <Column index={item.item} state={item.state} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
