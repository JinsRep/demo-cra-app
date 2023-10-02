import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-5">
      <h1 className="text-6xl text-slate-950 font-bold mb-5">{count}</h1>

      <div className="pt-2">
        <PrimaryButton
          onClick={(e) => {
            setCount((c) => c + 1);
          }}
        >
          +
        </PrimaryButton>
        <PrimaryButton
          onClick={(e) => {
            setCount((c) => c - 1);
          }}
        >
          -
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Counter;
