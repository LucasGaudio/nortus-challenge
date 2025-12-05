export default function SelectFilter({ label, value, onChange, options }: any) {
    return (
      <select
        className="bg-[#1F2937] p-3 rounded-xl outline-none cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  