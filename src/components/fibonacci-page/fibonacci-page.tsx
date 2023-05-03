import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { useForm, useSimpleForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { input, onChange, setInput } = useSimpleForm("");
  const [isLoading, setIsLoading] = useState(false);
  const [mainArray, setMainArray] = useState<Array<number>>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const getFibonacciNumbers = async (n: number) => {
      setMainArray([1]);
      await delay(500);
      setMainArray([1, 1]);
      await delay(500);
      let arr: number[] = [1, 1];

      for (let i = 2; i <= n; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);

        setMainArray([...arr]);
        await delay(500);
      }
      setIsLoading(false);
    };

    input && getFibonacciNumbers(Number(input));
    setInput("");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          data-cy="input"
          type="number"
          isLimitText={true}
          max={19}
          value={input}
          onChange={onChange}
        />
        <Button
          data-cy="button"
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={!input || Number(input) > 19 || Number(input) === 0}
        />
      </form>
      {mainArray && (
        <ul className={styles.list}>
          {mainArray?.map((item, index) => (
            <li key={index} className={styles.item}>
              <Circle letter={item.toString()} index={index} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
