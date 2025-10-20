import React, { useState } from "react";

function SelectDaysUi({ onSelectedOption }: any) {
  const [days, setDays] = useState(2);

  const increase = () => setDays((prev) => prev + 1);
  const decrease = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));
  const confirm = () => onSelectedOption(String(days));

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-2xl w-80">
      <h2 className="text-lg font-semibold mb-3 text-center">
        How many days do you want to travel?
      </h2>

      <div className="flex items-center space-x-6 mb-4">
        <button
          onClick={decrease}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
        >
          −
        </button>

        <span className="text-xl font-semibold">{days} Days</span>

        <button
          onClick={increase}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
        >
          +
        </button>
      </div>

      <button
        onClick={confirm}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
      >
        Confirm
      </button>
    </div>
  );
}

export default SelectDaysUi;
