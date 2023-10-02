import { act, render, screen, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList tests", () => {
  it("Renders correctly by fetching data", async () => {
    render(<TodoList />);

    await screen.findByText("Loading todos...");

    await waitFor(() =>
      expect(screen.queryByText("Loading todos...")).toBeNull()
    );

    const todoListHeading = await screen.findByRole("heading", {
      name: /Todo List/i,
    });
    expect(todoListHeading).toBeInTheDocument();

    const rows = screen.getAllByRole("row") as HTMLTableRowElement[];

    expect(rows).toHaveLength(5);

    const rowCountElement = screen.getByTestId("itemCount");
    expect(rowCountElement).toBeInTheDocument();
    expect(rowCountElement).toHaveTextContent("Count: 4");

    const filterAllRadio = screen.getByLabelText("All") as HTMLInputElement;
    expect(filterAllRadio).toBeInTheDocument();
    expect(filterAllRadio.checked).toBe(true);

    expect(rows[1].cells.item(0)).toHaveTextContent("1");
    expect(rows[2].cells.item(0)).toHaveTextContent("2");
    expect(rows[3].cells.item(0)).toHaveTextContent("3");
    expect(rows[4].cells.item(0)).toHaveTextContent("4");

    expect(rows[1].cells.item(1)).toHaveTextContent("TodoItem1");
    expect(rows[2].cells.item(1)).toHaveTextContent("TodoItem2");
    expect(rows[3].cells.item(1)).toHaveTextContent("TodoItem3");
    expect(rows[4].cells.item(1)).toHaveTextContent("TodoItem4");

    expect(rows[1].cells.item(2)).toHaveTextContent("In Progress");
    expect(rows[2].cells.item(2)).toHaveTextContent("In Progress");
    expect(rows[3].cells.item(2)).toHaveTextContent("Completed");
    expect(rows[4].cells.item(2)).toHaveTextContent("In Progress");
  });

  it("Filters data correctly based on status selection", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await waitFor(() =>
      expect(screen.queryByText("Loading todos...")).toBeNull()
    );

    const rowCountElement = screen.getByTestId("itemCount");

    const filterInProgressRadio = screen.getByLabelText(
      "In Progress"
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(filterInProgressRadio);
    });

    expect(rowCountElement).toHaveTextContent("Count: 3");

    const rows = screen.getAllByRole("row") as HTMLTableRowElement[];

    expect(rows[1].cells.item(0)).toHaveTextContent("1");
    expect(rows[2].cells.item(0)).toHaveTextContent("2");
    expect(rows[3].cells.item(0)).toHaveTextContent("4");

    expect(rows[1].cells.item(1)).toHaveTextContent("TodoItem1");
    expect(rows[2].cells.item(1)).toHaveTextContent("TodoItem2");
    expect(rows[3].cells.item(1)).toHaveTextContent("TodoItem4");

    expect(rows[1].cells.item(2)).toHaveTextContent("In Progress");
    expect(rows[2].cells.item(2)).toHaveTextContent("In Progress");
    expect(rows[3].cells.item(2)).toHaveTextContent("In Progress");

    const filterCompletedRadio = screen.getByLabelText(
      "Completed"
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(filterCompletedRadio);
    });

    expect(rowCountElement).toHaveTextContent("Count: 1");

    const rowsCompleted = screen.getAllByRole("row") as HTMLTableRowElement[];

    expect(rowsCompleted[1].cells.item(0)).toHaveTextContent("3");

    expect(rowsCompleted[1].cells.item(1)).toHaveTextContent("TodoItem3");

    expect(rowsCompleted[1].cells.item(2)).toHaveTextContent("Completed");
  });
});
