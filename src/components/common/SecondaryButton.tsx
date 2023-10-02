import { ButtonHTMLAttributes } from "react";

export type SecondaryButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

function SecondaryButton({ children, ...rest }: SecondaryButtonProps) {
  return (
    <button
      {...rest}
      className="text-slate-900 bg-gray-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
