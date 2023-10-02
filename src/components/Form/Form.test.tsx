import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Form from "./Form";

describe("Registration Form Tests", () => {
  it("Renders correctly", () => {
    render(<Form />);
    const regHeadingElement = screen.getByRole("heading", {
      name: /registration/i,
    });
    expect(regHeadingElement).toBeInTheDocument();

    const userNameInput = screen.getByLabelText("User Name");
    expect(userNameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText("Email Address:");
    expect(emailInput).toBeInTheDocument();

    const planSelect = screen.getByLabelText("Plan:") as HTMLSelectElement;
    expect(planSelect).toBeInTheDocument();
    expect(planSelect.value).toBe("1");

    const eulaAgreeCheckBox = screen.getByLabelText(
      /I Agree/
    ) as HTMLInputElement;
    expect(eulaAgreeCheckBox).toBeInTheDocument();
    expect(eulaAgreeCheckBox.checked).toBe(false);

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    }) as HTMLButtonElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBe(true);

    const resetButton = screen.getByRole("button", {
      name: "Reset",
    }) as HTMLButtonElement;
    expect(resetButton).toBeInTheDocument();
    expect(resetButton.disabled).toBe(false);
  });

  it("When selecting premuim plan ask credit card", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const planSelect = screen.getByLabelText("Plan:");
    expect(planSelect).toBeInTheDocument();

    const creditCardInput = screen.queryByLabelText("Credit Card:");
    expect(creditCardInput).not.toBeInTheDocument();

    await act(async () => {
      await user.selectOptions(planSelect, ["3"]);
    });

    const creditCardInput2 = screen.queryByLabelText("Credit Card:");
    expect(creditCardInput2).toBeInTheDocument();

    await act(async () => {
      await user.selectOptions(planSelect, ["2"]);
    });

    const creditCardInput3 = screen.queryByLabelText("Credit Card:");
    expect(creditCardInput3).not.toBeInTheDocument();
  });

  it("When checking I Agree Check box Submit button should enable and vice versa", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const eulaAgreeCheckBox = screen.getByLabelText(
      /I Agree/
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(eulaAgreeCheckBox);
    });

    expect(eulaAgreeCheckBox.checked).toBe(true);

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    }) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);

    await act(async () => {
      await user.click(eulaAgreeCheckBox);
    });

    expect(eulaAgreeCheckBox.checked).toBe(false);
    expect(submitButton.disabled).toBe(true);
  });

  it("Without filling anything when submits validations are firing", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const eulaAgreeCheckBox = screen.getByLabelText(
      /I Agree/
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(eulaAgreeCheckBox);
    });

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    }) as HTMLButtonElement;

    await act(async () => {
      await user.click(submitButton);
    });

    const userNameValidationMessage = await screen.findByText(
      /enter user name/i
    );
    expect(userNameValidationMessage).toBeInTheDocument();
  });

  it("Validating email format", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const userNameInput = screen.getByLabelText("User Name");
    await user.type(userNameInput, "Test User");

    const emailInput = screen.getByLabelText("Email Address:");
    await user.type(emailInput, "example");

    const eulaAgreeCheckBox = screen.getByLabelText(
      /I Agree/
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(eulaAgreeCheckBox);
    });

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    }) as HTMLButtonElement;

    await act(async () => {
      await user.click(submitButton);
    });

    const emailValidationMessage = await screen.findByText(/invalid email/i);

    expect(emailValidationMessage).toBeInTheDocument();
  });

  it("Testing Form Submit", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const userNameInput = screen.getByLabelText(
      "User Name"
    ) as HTMLInputElement;
    await user.type(userNameInput, "Test User");

    const emailInput = screen.getByLabelText(
      "Email Address:"
    ) as HTMLInputElement;
    await user.type(emailInput, "example@abc.com");

    const planSelect = screen.getByLabelText("Plan:") as HTMLSelectElement;
    await act(async () => {
      await user.selectOptions(planSelect, ["3"]);
    });

    const creditCardInput = await screen.findByLabelText("Credit Card:");
    await user.type(creditCardInput, "5475585888");

    const eulaAgreeCheckBox = screen.getByLabelText(
      /I Agree/
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(eulaAgreeCheckBox);
    });

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    }) as HTMLButtonElement;

    await act(async () => {
      await user.click(submitButton);
    });

    const successMessage = await screen.findByText(/registration completed/i);
    expect(successMessage).toBeInTheDocument();
  });

  it("Testing Form Reset", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const userNameInput = screen.getByLabelText(
      "User Name"
    ) as HTMLInputElement;
    await user.type(userNameInput, "Test User");

    const emailInput = screen.getByLabelText(
      "Email Address:"
    ) as HTMLInputElement;
    await user.type(emailInput, "example@abc.com");

    const planSelect = screen.getByLabelText("Plan:") as HTMLSelectElement;
    await act(async () => {
      await user.selectOptions(planSelect, ["2"]);
    });

    const eulaAgreeCheckBox = screen.getByLabelText(
      /I Agree/
    ) as HTMLInputElement;

    await act(async () => {
      await user.click(eulaAgreeCheckBox);
    });

    const resetButton = screen.getByRole("button", {
      name: "Reset",
    }) as HTMLButtonElement;

    await act(async () => {
      await user.click(resetButton);
    });

    expect(userNameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(planSelect.value).toBe("1");
    expect(eulaAgreeCheckBox.checked).toBe(false);
  });
});
