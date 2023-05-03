import { onSubmitReverse } from "./string";

describe("Тестирование алгоритма разворота строки", () => {
  it("Корректно разворачивает строку: с чётным количеством символов", async () => {
    const string = await onSubmitReverse("1234");
    expect(string).toEqual([
      {
        item: "4",
        state: "modified",
      },
      {
        item: "3",
        state: "modified",
      },
      {
        item: "2",
        state: "modified",
      },
      {
        item: "1",
        state: "modified",
      },
    ]);
  });

  it("Корректно разворачивает строку: с нечетным количеством символов", async () => {
    const string = await onSubmitReverse("123");
    expect(string).toEqual([
      {
        item: "3",
        state: "modified",
      },
      {
        item: "2",
        state: "modified",
      },
      {
        item: "1",
        state: "modified",
      },
    ]);
  });

  it("Корректно разворачивает строку: с одним символом", async () => {
    const string = await onSubmitReverse("1");
    expect(string).toEqual([
      {
        item: "1",
        state: "modified",
      },
    ]);
  });

  it("Корректно разворачивает строку: пустую строку", async () => {
    const string = await onSubmitReverse("");
    expect(string).toEqual([]);
  });
});
