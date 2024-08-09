import React, { useState, useRef, useEffect } from "react";

interface DropdownCheckboxProps {
  options: { label: string; value: string }[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
}

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  options,
  selectedOptions,
  onOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (option: string) => {
    onOptionChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="w-full p-2 border rounded-lg text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select Schedule
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <label key={option.value} className="flex items-center p-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
