import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useSimpleForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

type TSetMainArray = Dispatch<
  SetStateAction<{ item: string; state: ElementStates }[]>
>;

const swap = (
  arr: Array<{ item: string; state: ElementStates }>,
  firstIndex: number,
  secondIndex: number,
  setMainArray?: TSetMainArray
) => {
  const temp = {
    item: arr[firstIndex].item,
    state: ElementStates.Modified,
  };
  arr[firstIndex] = {
    item: arr[secondIndex].item,
    state: ElementStates.Modified,
  };
  arr[secondIndex] = temp;
  setMainArray && setMainArray(arr);
};

export const onSubmitReverse = async (
  input: string,
  setMainArray?: TSetMainArray
) => {
  if (input === "") {
    return [];
  }
  let arr: Array<{ item: string; state: ElementStates }> = [];

  const letters: Array<string> = input.split("");

  letters.forEach((item) =>
    arr.push({ item: item, state: ElementStates.Default })
  );

  let len = arr.length;
  let left = 0;
  let rigth = len - 1;

  setMainArray && setMainArray(arr);

  while (left <= rigth) {
    for (let i = 0; i < len; i++) {
      if (i === left || i === rigth) {
        arr[i].state = ElementStates.Changing;
      }

      setMainArray && setMainArray([...arr]);
    }

    if (setMainArray) {
      await delay(1000);

      swap(arr, left, rigth, setMainArray);
    } else {
      swap(arr, left, rigth);
    }

    left++;
    rigth--;
  }
  return arr;
};

export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { input, onChange, setInput } = useSimpleForm("");
  const [mainArray, setMainArray] = useState<
    Array<{ item: string; state: ElementStates }>
  >([]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInput("");

    await onSubmitReverse(input, setMainArray);

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={input || ""}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={input.length < 2}
        />
      </form>
      {mainArray && (
        <ul className={styles.list}>
          {mainArray?.map((item, index) => (
            <li key={index} className={styles.item}>
              <Circle letter={item.item} state={item.state} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
