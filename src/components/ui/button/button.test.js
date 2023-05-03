import { Button } from "./button";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Проверяем Button при помощи снэпшотов корректную отрисовку", () => {
  it("кнопки с текстом", () => {
    const buttonWithText = renderer.create(<Button text="text" />);
    expect(buttonWithText).toMatchSnapshot();
  });

  it("кнопки без текста", () => {
    const buttonWithoutText = renderer.create(<Button />);
    expect(buttonWithoutText).toMatchSnapshot();
  });

  it("заблокированной кнопки", () => {
    const buttonDisabled = renderer.create(<Button disabled={true} />);
    expect(buttonDisabled).toMatchSnapshot();
  });

  it("кнопки с индикацией загрузки", () => {
    const buttonWithLoadingIndication = renderer.create(
      <Button isLoader={true} />
    );
    expect(buttonWithLoadingIndication).toMatchSnapshot();
  });

  describe("Проверяем корректность вызова колбека при клике на кнопку", () => {
    it("вызов колбека при клике на кнопку корректен", () => {
      const callBack = jest.fn();
      render(<Button onClick={callBack} />);
      const button = screen.getByTestId("button-test");
      fireEvent.click(button);
      expect(callBack).toHaveBeenCalled();
    });
  });
});
