import { ButtonHTMLAttributes } from "react";

export type PrimaryButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

function PrimaryButton({ children, ...rest }: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      className="text-white bg-blue-700 disabled:bg-gray-200 disabled:text-gray-300 hover:not([disabled]):bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
