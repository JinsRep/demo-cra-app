import { SubmitHandler, useForm } from "react-hook-form";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
import { useState } from "react";

export type RegFormState = {
  username: string;
  email: string;
  plan: number;
  card: string;
  eulaAgree: boolean;
};

function Form() {
  const [values, setValues] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm<RegFormState>({
    defaultValues: {
      username: "",
      email: "",
      plan: 1,
      eulaAgree: false,
    },
  });

  const planValue = watch("plan");
  const eulaAgreeValue = watch("eulaAgree");

  const onSubmit: SubmitHandler<RegFormState> = (data) => {
    setValues(data);
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl text-slate-950 font-bold mb-5">Registration</h1>

      {submitted && (
        <div>
          <div
            data-testid="hhh"
            className="text-4xl text-green-800 font-semibold mb-6"
          >
            Registration completed
          </div>
          <div className="text-black text-sm">{JSON.stringify(values)}</div>
        </div>
      )}
      {!submitted && (
        <form noValidate className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-3">
            <label
              htmlFor="username"
              className="block text-sm text-gray-600 mb-1"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              aria-required="true"
              className="w-full"
              {...register("username", {
                required: "Enter User name",
              })}
            />
            {!!errors.username && (
              <span className="text-sm text-red-800">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="p-3">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              className="w-full"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            {!!errors.email && (
              <span className="text-sm text-red-800">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="p-3">
            <label htmlFor="plan" className="block text-sm text-gray-600 mb-1">
              Plan:
            </label>
            <select
              id="plan"
              {...register("plan", { valueAsNumber: true })}
              className="w-full"
            >
              <option value={1}>Basic</option>
              <option value={2}>Advanced</option>
              <option value={3}>Premium</option>
            </select>
          </div>
          {planValue === 3 && (
            <div className="p-3">
              <label
                htmlFor="card"
                className="block text-sm text-gray-600 mb-1"
              >
                Credit Card:
              </label>
              <input
                type="text"
                id="card"
                className="w-full"
                {...register("card", {
                  required: "Enter Card Number",
                })}
              />
              {!!errors.card && (
                <span className="text-sm text-red-800">
                  {errors.card.message}
                </span>
              )}
            </div>
          )}
          <div className="p-3">
            <label
              htmlFor="eulaAgree"
              className="block text-sm text-gray-600 mb-1"
            >
              I Agree ? &nbsp;
              <input
                id="eulaAgree"
                type="checkbox"
                aria-required="true"
                {...register("eulaAgree")}
              />
            </label>
          </div>
          <div className="py-4 px-3">
            <PrimaryButton type="submit" disabled={!eulaAgreeValue}>
              Submit
            </PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </SecondaryButton>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;
