import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter Tests", () => {
  it("Renders correctly", () => {
    render(<Counter />);

    const counterDisplayElement = screen.getByRole("heading");
    expect(counterDisplayElement).toBeInTheDocument();
    expect(counterDisplayElement).toHaveTextContent("0");

    const incrementButton = screen.getByRole("button", { name: "+" });
    const decrementButton = screen.getByRole("button", { name: "-" });
    expect(incrementButton).toHaveTextContent("+");
    expect(decrementButton).toHaveTextContent("-");
  });

  it("Increments correctly", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const counterDisplayElement = screen.getByRole("heading");
    const incrementButton = screen.getByRole("button", { name: "+" });
    await act(async () => {
      await user.click(incrementButton);
      await user.click(incrementButton);
    });

    expect(counterDisplayElement).toHaveTextContent("2");
  });

  it("Decrements correctly", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const counterDisplayElement = screen.getByRole("heading");
    const decrementButton = screen.getByRole("button", { name: "-" });
    await act(async () => {
      await user.click(decrementButton);
    });

    expect(counterDisplayElement).toHaveTextContent("-1");
  });
});
