import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("Проверяем Circle при помощи снэпшотов корректную отрисовку элемента", () => {
  it("без буквы", () => {
    const cricleWithoutLetter = renderer.create(<Circle />);
    expect(cricleWithoutLetter).toMatchSnapshot();
  });

  it("с буквами", () => {
    const cricleWithLetter = renderer.create(<Circle letter="f" />);
    expect(cricleWithLetter).toMatchSnapshot();
  });

  it("с head", () => {
    const cricleWithHead = renderer.create(<Circle head={"top"} />);
    expect(cricleWithHead).toMatchSnapshot();
  });

  it("с react-элементом в head", () => {
    const cricleWithReactElInHead = renderer.create(
      <Circle head={<Circle letter="T" />} />
    );
    expect(cricleWithReactElInHead).toMatchSnapshot();
  });

  it("с tail", () => {
    const cricleWithTail = renderer.create(<Circle tail={"T"} />);
    expect(cricleWithTail).toMatchSnapshot();
  });

  it("с react-элементом в tail", () => {
    const cricleWithReactElInTail = renderer.create(
      <Circle tail={<Circle letter="T" />} />
    );
    expect(cricleWithReactElInTail).toMatchSnapshot();
  });

  it("с index", () => {
    const cricleWithIndex = renderer.create(<Circle index={1} />);
    expect(cricleWithIndex).toMatchSnapshot();
  });

  it("с пропом isSmall ===  true", () => {
    const cricleWithPropsIsSmall = renderer.create(<Circle isSmall={true} />);
    expect(cricleWithPropsIsSmall).toMatchSnapshot();
  });

  it("в состоянии default", () => {
    const cricleDefault = renderer.create(
      <Circle state={ElementStates.Default} />
    );
    expect(cricleDefault).toMatchSnapshot();
  });

  it("в состоянии changing", () => {
    const cricleChanging = renderer.create(
      <Circle state={ElementStates.Changing} />
    );
    expect(cricleChanging).toMatchSnapshot();
  });

  it("в состоянии modified", () => {
    const cricleModified = renderer.create(
      <Circle state={ElementStates.Modified} />
    );
    expect(cricleModified).toMatchSnapshot();
  });
});
