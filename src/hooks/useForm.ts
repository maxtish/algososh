import { useState, ChangeEvent } from 'react';

export function useSimpleForm(inputValue: string) {
  const [input, setInput] = useState(inputValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    console.log(input);
    setInput(input);
  };
  return { input, onChange, setInput };
}

export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, onChange, setValues };
}
