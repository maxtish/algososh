import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { useSimpleForm } from '../../hooks/useForm';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import styles from './stack-page.module.css';
import { Stack } from '.';
import { delay } from '../string/string';

type TElemArray = { item: string; state: ElementStates };

export const StackPage: React.FC = () => {
  const { input, onChange, setInput } = useSimpleForm('');
  const [mainArray, setMainArray] = useState<Array<TElemArray>>([]);
  const [stack] = useState(new Stack<TElemArray>());
  const [buttonState, setButtonState] = useState({ butAdd: false, butDel: false });

  const addInStack = async () => {
    setButtonState((prev) => ({ ...prev, butAdd: true }));
    stack.enqueue({ item: input, state: ElementStates.Changing });
    setMainArray([...stack.getItems()]);
    setInput('');
    await delay(500);
    stack.peak()!.state = ElementStates.Default;
    setMainArray([...stack.getItems()]);
    setButtonState((prev) => ({ ...prev, butAdd: false }));
  };

  const delFromStack = async () => {
    setButtonState((prev) => ({ ...prev, butDel: true }));
    stack.peak()!.state = ElementStates.Changing;
    setMainArray([...stack.getItems()]);
    await delay(500);

    stack.dequeue();
    setMainArray([...stack.getItems()]);
    setButtonState((prev) => ({ ...prev, butDel: false }));
  };

  const cleanStack = () => {
    stack.clean();
    setMainArray([...stack.getItems()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Input type="text" isLimitText={true} maxLength={4} value={input} onChange={onChange} />
          <Button
            text="Добавить"
            type="button"
            disabled={input === ''}
            isLoader={buttonState.butAdd}
            onClick={addInStack}
          />
          <Button
            text="Удалить"
            type="button"
            isLoader={buttonState.butDel}
            disabled={stack.isEmpty()}
            onClick={delFromStack}
          />
        </div>
        <Button text="Очистить" type="button" disabled={stack.isEmpty()} onClick={cleanStack} />
      </div>
      <ul className={styles.list}>
        {mainArray &&
          mainArray.map((item, index) => (
            <li key={index} className={styles.item}>
              <Circle
                letter={item.item}
                state={item.state}
                index={index}
                head={index === stack.getSize() - 1 ? 'top' : ''}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
