import React, { useState, Dispatch, SetStateAction } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import styles from './sorting-page.module.css';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { delay } from '../string/string';

type TMainArray = Array<{ item: number; state: ElementStates }>;

export const SortingPage: React.FC = () => {
  let arr: Array<{ item: number; state: ElementStates }> = [];

  const randomArr = () => {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    for (let i = 0; i < getRandomInt(3, 18); i++) {
      arr.push({ item: getRandomInt(0, 101), state: ElementStates.Default });
    }
    return arr;
  };

  const [mainArray, setMainArray] = useState<TMainArray>(randomArr());
  const [checked, setChecked] = useState<string>('select');
  console.log(mainArray);
  const newRandomArr = () => {
    setMainArray(randomArr());
  };

  const swap = (
    arr: Array<{ item: number; state: ElementStates }>,
    setArray: Dispatch<SetStateAction<TMainArray>>,
    firstIndex: number,
    secondIndex: number
  ) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    setArray(arr);
  };

  const selectionSort = async (
    arr: TMainArray,
    direction: Direction,
    setArray: Dispatch<SetStateAction<TMainArray>>
  ) => {
    const { length } = arr;

    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;

      for (let j = i; j < length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
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
        setArray([...arr]);
      }

      swap(arr, setArray, i, maxInd);
      arr[i].state = ElementStates.Modified;
    }
    setArray([...arr]);
  };

  const bubbleSort = async (arr: TMainArray, direction: Direction, setArray: Dispatch<SetStateAction<TMainArray>>) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArray([...arr]);
        await delay(1000);

        if (direction === Direction.Ascending) {
          if (arr[j].item > arr[j + 1].item) {
            // сортируем элементы по возрастанию
            swap(arr, setArray, j, j + 1);
          }
        } else if (direction === Direction.Descending) {
          if (arr[j].item < arr[j + 1].item) {
            // сортируем элементы по возрастанию
            swap(arr, setArray, j, j + 1);
          }
        }

        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;

        setArray([...arr]);
      }

      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
  };

  const sortDescending = () => {
    if (mainArray.length > 0) {
      if (checked === 'select') {
        selectionSort(mainArray, Direction.Descending, setMainArray);
      } else {
        bubbleSort(mainArray, Direction.Descending, setMainArray);
      }
    }
  };

  const sortAscending = () => {
    if (mainArray.length > 0) {
      if (checked === 'select') {
        selectionSort(mainArray, Direction.Ascending, setMainArray);
      } else {
        bubbleSort(mainArray, Direction.Ascending, setMainArray);
      }
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.method}>
          <RadioInput
            value="select"
            checked={checked === 'select'}
            onChange={() => setChecked('select')}
            label="Выбор"
          />
          <RadioInput
            value="bubble"
            checked={checked === 'bubble'}
            onChange={() => setChecked('bubble')}
            label="Пузырёк"
          />
        </div>
        <div className={styles.sort}>
          <Button text="По возрастанию" type="button" onClick={sortAscending} sorting={Direction.Ascending} />
          <Button text="По убыванию" type="button" onClick={sortDescending} sorting={Direction.Descending} />
        </div>
        <Button text="Новый массив" type="button" onClick={newRandomArr} />
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
