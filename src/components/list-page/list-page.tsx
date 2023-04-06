import React, { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './list-page.module.css';
import { ElementStates } from '../../types/element-states';
import { LinkedList } from './Index';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { useForm } from '../../hooks/useForm';
import { delay } from '../string/string';

type TElem = { item: string; state: ElementStates };

type elemSmallCircle = {
  item: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const { values, onChange, setValues } = useForm({ inputElement: '', inputIndex: '' });
  const [mainArray, setMainArray] = useState<Array<TElem>>([]);
  const [isLoader, setIsLoader] = useState({
    forButtHead: false,
    forButtTail: false,
    forButtDelHead: false,
    forButtDelTail: false,
    forButtAddByInd: false,
    forButtDelByInd: false,
    allDis: false,
  });
  const [list, setList] = useState(new LinkedList<TElem>());
  const [newElemInHead, setNewElemInHead] = useState<elemSmallCircle | null>(null);
  const [delElemInTail, setDelElemInTail] = useState<elemSmallCircle | null>(null);

  // Валидация кнопок индекс
  const isValidIndex = useMemo(() => {
    if (values.inputIndex.length === 0) {
      return false;
    } else if (Number(values.inputIndex) < mainArray.length && Number(values.inputIndex) > -1) {
      return true;
    } else {
      return false;
    }
  }, [mainArray.length, values.inputIndex]);

  // Начальное значение
  useEffect(() => {
    const array: Array<TElem> = [];
    for (let i = 0; i < 5; i++) {
      array.push({
        item: Math.round(Math.random() * 100).toString(),
        state: ElementStates.Default,
      });
    }
    setList(new LinkedList(array));
    setMainArray(array);
  }, []);

  // КНОПКА Добавить в head
  const addInHead = async () => {
    setIsLoader((prev) => ({ ...prev, forButtHead: true, allDis: true }));
    const newElem = {
      item: values.inputElement,
      state: ElementStates.Default,
    };
    setValues({ ...values, inputElement: '' });
    //Покажим элемент в head
    setNewElemInHead({ item: newElem.item, index: 0 });
    await delay(500);
    setNewElemInHead(null);
    //Выделим зеленым Modified
    mainArray.unshift({ item: newElem.item, state: ElementStates.Modified });
    setMainArray([...mainArray]);
    await delay(500);
    list.prepend(newElem);
    setMainArray(list.toArray());
    setIsLoader((prevState) => ({
      ...prevState,
      forButtHead: false,
      allDis: false,
    }));
  };

  // КНОПКА Добавить в tail
  const addInTail = async () => {
    setIsLoader((prev) => ({
      ...prev,
      forButtTail: true,
      allDis: true,
    }));
    const newElem = {
      item: values.inputElement,
      state: ElementStates.Default,
    };
    setValues({ ...values, inputElement: '' });
    //Покажим элемент в head
    setNewElemInHead({ item: newElem.item, index: mainArray.length - 1 });
    await delay(500);
    setNewElemInHead(null);
    const colorArr = mainArray.map((elem) => {
      return {
        item: elem.item,
        state: ElementStates.Default,
      };
    });
    //Выделим зеленым Modified
    colorArr.push({ item: newElem.item, state: ElementStates.Modified });
    setMainArray(colorArr);
    await delay(1000);
    list.append(newElem);
    await mainArray.forEach((elem) => (elem.state = ElementStates.Default));
    setMainArray(list.toArray());
    setIsLoader((prevState) => ({
      ...prevState,
      forButtTail: false,
      allDis: false,
    }));
  };

  // КНОПКА Удалить из head
  const deleteFromHead = async () => {
    setIsLoader((prev) => ({
      ...prev,
      forButtDelHead: true,
      allDis: true,
    }));
    //Покажим элемент в tail
    setDelElemInTail({ item: mainArray[0].item, index: 0 });
    const colorArr = mainArray.map((elem, currIndex) => {
      if (currIndex === 0) {
        return { item: '', state: ElementStates.Default };
      } else {
        return elem;
      }
    });
    setMainArray(colorArr);
    await delay(500);
    setDelElemInTail(null);
    list.deleteHead();
    setMainArray(list.toArray());
    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelHead: false,
      allDis: false,
    }));
  };

  // КНОПКА Удалить из tail
  const deleteFromTail = async () => {
    setIsLoader((prev) => ({
      ...prev,
      forButtDelTail: true,
      allDis: true,
    }));
    const indLastElem = mainArray.length > 1 ? mainArray.length - 1 : 0;
    //раскрасим массив
    const colorArr = mainArray.map((elem, currIndex) => {
      if (currIndex !== indLastElem) {
        return elem;
      } else {
        return {
          item: '',
          state: ElementStates.Default,
        };
      }
    });
    setMainArray(colorArr);
    //Покажим элемент в tail
    setDelElemInTail({ item: mainArray[indLastElem].item, index: indLastElem });
    await delay(500);
    setDelElemInTail(null);
    list.deleteTail();
    setMainArray(list.toArray());
    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelTail: false,
      allDis: false,
    }));
  };

  // КНОПКА Добавить по индексу
  const addByIndex = async () => {
    setIsLoader((prev) => ({
      ...prev,
      forButtAddByInd: true,
      allDis: true,
    }));
    const newElem = {
      item: values.inputElement,
      state: ElementStates.Default,
    };
    const index = Number(values.inputIndex);
    setValues({ ...values, inputElement: '', inputIndex: '' });

    const colorArr: Array<TElem> = mainArray.map((elem) => {
      return {
        item: elem.item,
        state: ElementStates.Default,
      };
    });

    for (let i = 0; i < mainArray.length; i++) {
      if (i < index) {
        colorArr[i].state = ElementStates.Changing;
        setNewElemInHead({ item: newElem.item, index: i });
        setMainArray([...colorArr]);
        await delay(500);
      }
      if (i === index) {
        setNewElemInHead({ item: newElem.item, index: i });
        await delay(500);
      }
    }
    const newColArr = colorArr.map((elem) => {
      return {
        item: elem.item,
        state: ElementStates.Default,
      };
    });
    setMainArray(newColArr);
    newColArr.splice(index, 0, {
      item: newElem.item,
      state: ElementStates.Modified,
    });
    setMainArray(newColArr);
    setNewElemInHead(null);
    await delay(1000);
    list.insertAt(newElem, index);
    setMainArray(list.toArray());
    setIsLoader((prev) => ({
      ...prev,
      forButtAddByInd: false,
      allDis: false,
    }));
  };

  //КНОПКА Удалить по индексу
  const deleteByIndex = async () => {
    setIsLoader((prev) => ({
      ...prev,
      forButtDelByInd: true,
      allDis: true,
    }));
    let index = Number(values.inputIndex);
    setValues({ ...values, inputIndex: '' });

    const colorArr: Array<TElem> = mainArray.map((elem) => {
      return {
        item: elem.item,
        state: ElementStates.Default,
      };
    });

    for (let i = 0; i < mainArray.length; i++) {
      if (i < index) {
        colorArr[i].state = ElementStates.Changing;

        setMainArray([...colorArr]);
        await delay(500);
      }
      if (i === index) {
        colorArr[i].state = ElementStates.Changing;
        setMainArray([...colorArr]);
        await delay(500);

        colorArr[i].item = '';
        setMainArray([...colorArr]);
        setDelElemInTail({ item: mainArray[index].item, index: index });
        await delay(500);
      }
    }

    await delay(500);
    setDelElemInTail(null);
    list.deleteByIndex(index);
    setMainArray(list.toArray());
    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelByInd: false,
      allDis: false,
    }));
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            placeholder="Введите значение"
            name="inputElement"
            value={values.inputElement}
            onChange={onChange}
            disabled={isLoader.allDis}
          />
          <Button
            text="Добавить в head"
            onClick={addInHead}
            isLoader={isLoader.forButtHead}
            disabled={values.inputElement.length === 0 || isLoader.allDis}
          />
          <Button
            text="Добавить в tail"
            onClick={addInTail}
            isLoader={isLoader.forButtTail}
            disabled={values.inputElement.length === 0 || isLoader.allDis}
          />
          <Button
            text="Удалить из head"
            onClick={deleteFromHead}
            isLoader={isLoader.forButtDelHead}
            disabled={mainArray.length === 0 || isLoader.allDis}
          />
          <Button
            text="Удалить из tail"
            onClick={deleteFromTail}
            isLoader={isLoader.forButtDelTail}
            disabled={mainArray.length === 0 || isLoader.allDis}
          />
        </div>
        <div className={styles.wrapindex}>
          <Input
            type="number"
            placeholder="Введите индекс"
            name="inputIndex"
            value={values.inputIndex}
            onChange={onChange}
            disabled={isLoader.allDis}
          />
          <Button
            text="Добавить по индексу"
            onClick={addByIndex}
            isLoader={isLoader.forButtAddByInd}
            disabled={values.inputElement.length !== 0 && isValidIndex ? false : true}
          />
          <Button
            text="Удалить по индексу"
            onClick={deleteByIndex}
            isLoader={isLoader.forButtDelByInd}
            disabled={mainArray.length === 0 || isLoader.allDis || !isValidIndex}
          />
        </div>
      </section>
      <ul className={styles.list}>
        {mainArray &&
          mainArray.map(({ item, state }, index) => (
            <li className={styles.item} key={index}>
              <Circle
                letter={item}
                state={state}
                index={index}
                head={
                  newElemInHead?.index === index ? (
                    <Circle letter={newElemInHead.item} state={ElementStates.Changing} isSmall />
                  ) : index === 0 ? (
                    'head'
                  ) : null
                }
                tail={
                  delElemInTail?.index === index ? (
                    <Circle letter={delElemInTail.item} state={ElementStates.Changing} isSmall />
                  ) : index === mainArray.length - 1 ? (
                    'tail'
                  ) : null
                }
              />
              {index + 1 < mainArray.length && <ArrowIcon />}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
