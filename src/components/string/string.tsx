import React, { useState, FormEvent } from "react";
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

export const StringComponent: React.FC = () => {
  let arr: Array<{ item: string; state: ElementStates }> = [];
  const [isLoading, setIsLoading] = useState(false);
  const { input, onChange, setInput } = useSimpleForm("");
  const [mainArray, setMainArray] = useState<typeof arr>();

  const swap = (
    arr: Array<{ item: string; state: ElementStates }>,
    firstIndex: number,
    secondIndex: number
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
    setMainArray(arr);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInput("");

    const letters: Array<string> = input.split("");

    letters.forEach((item) =>
      arr.push({ item: item, state: ElementStates.Default })
    );

    let len = arr.length;
    let left = 0;
    let rigth = len - 1;

    setMainArray(arr);

    while (left <= rigth) {
      for (let i = 0; i < len; i++) {
        if (i === left || i === rigth) {
          arr[i].state = ElementStates.Changing;
        }

        setMainArray([...arr]);
      }
      await delay(1000);

      swap(arr, left, rigth);

      left++;
      rigth--;
    }

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
