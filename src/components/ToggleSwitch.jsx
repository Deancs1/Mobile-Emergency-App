import { useState } from "react";

const ToggleSwitch = ({ labelOn, labelOff }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggel = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggel}
      />
      <div
        className={`relative w-11 h-6 rounded-full ${
          isChecked ? "bg-green-600" : "bg-gray-200"
        } peer  dark:peer-focus:ring-blue-800 dark:bg-gray-700`}
      >
        <div
          className={`absolute top-0.5 start-[2px] h-5 w-5 bg-white border border-gray-300 rounded-full transition-all ${
            isChecked ? "translate-x-full border-white" : ""
          }`}
        />
      </div>
      <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">
        {isChecked ? labelOn : labelOff}
      </span>
    </label>
  );
};

export default ToggleSwitch;
