import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';
import { Enqueue } from './index';
import { useSimpleForm } from '../../hooks/useForm';
import { ElementStates } from '../../types/element-states';
import { delay } from '../string/string';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';

type TElemArray = {
  item?: string;
  state: ElementStates;
  isTail?: boolean;
  isHead?: boolean;
};

export const QueuePage: React.FC = () => {
  const { input, onChange, setInput } = useSimpleForm('');
  const [mainArray, setMainArray] = useState<Array<TElemArray>>(
    Array.from({ length: 7 }, () => ({
      state: ElementStates.Default,
    }))
  );
  const [queue] = useState(new Enqueue<TElemArray>(7));
  const [buttonState, setButtonState] = useState({
    butAdd: false,
    butDel: false,
    butDelLoad: false,
    butClean: false,
  });
  const [indexTail, setIndexTail] = useState(queue.getIndexTail());
  const [indexHead, setIndexHead] = useState(queue.getIndexHead());

  const addInQueue = async () => {
    setButtonState((prev) => ({ ...prev, butAdd: true }));

    mainArray[indexTail].state = ElementStates.Changing;
    setMainArray([...mainArray]);
    await delay(500);
    queue.enqueue({ item: input, state: ElementStates.Changing });
    mainArray[indexTail] = {
      item: input,
      state: ElementStates.Default,
      isTail: true,
      isHead: true,
    };
    if (indexTail - 1 > -1) {
      mainArray[indexTail - 1].isTail = false;
    }
    setMainArray([...mainArray]);
    setInput('');
    setButtonState((prev) => ({ ...prev, butAdd: false, butClean: false, butDel: false }));
    setIndexTail(queue.getIndexTail());
    setIndexHead(queue.getIndexHead());
  };

  const delFromQueue = async () => {
    setButtonState((prev) => ({ ...prev, butDel: true }));

    if (indexHead === indexTail - 1) {
      if (indexHead === 6) {
        mainArray[indexHead] = {
          item: '',
          state: ElementStates.Default,
          isTail: false,
          isHead: true,
        };
        setButtonState((prev) => ({
          ...prev,
          butDelLoad: false,
          butDel: true,
          butClean: false,
        }));
      }
      setButtonState((prev) => ({
        ...prev,
        butDelLoad: false,
        butDel: true,
      }));
      setMainArray([...mainArray]);
      return;
    }

    await delay(500);
    queue.dequeue();
    mainArray[indexHead] = {
      item: '',
      state: ElementStates.Default,
      isHead: true,
    };
    setButtonState((prev) => ({ ...prev, butDel: false }));
    setMainArray([...mainArray]);
    setIndexHead(queue.getIndexHead());
    setIndexTail(queue.getIndexTail());
  };

  const cleanQueue = () => {
    queue.clean();
    mainArray.forEach((item) => {
      item.item = '';
      item.state = ElementStates.Default;
      item.isTail = false;
      item.isHead = false;
    });

    setButtonState((prev) => ({
      ...prev,
      butDel: true,
      butClean: true,
    }));
    setMainArray([...mainArray]);
    setIndexHead(queue.getIndexHead());
    setIndexTail(queue.getIndexTail());
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Input type="text" isLimitText={true} maxLength={4} value={input} onChange={onChange} />
          <Button
            text="Добавить"
            type="button"
            disabled={input.length === 0 || indexTail === 7 ? true : false}
            isLoader={buttonState.butAdd}
            onClick={addInQueue}
          />
          <Button
            text="Удалить"
            type="button"
            isLoader={buttonState.butDelLoad}
            disabled={buttonState.butDel}
            onClick={delFromQueue}
          />
        </div>
        <Button text="Очистить" type="button" disabled={buttonState.butClean} onClick={cleanQueue} />
      </div>
      <ul className={styles.list}>
        {mainArray.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.item}
              index={index}
              head={item.isHead && queue.getIndexHead() === index ? 'head' : ''}
              tail={item.isTail ? 'tail' : ''}
              state={item.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
