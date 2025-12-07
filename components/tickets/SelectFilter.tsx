interface SelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function SelectFilter({ label, value, onChange, options }: SelectFilterProps) {
  return (
    <select
      className="bg-[#1F2937] p-3 rounded-xl outline-none cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option>{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
  