interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

function ChatRadio({ options, value, onChange }: RadioGroupProps) {
  return (
    <div role="radiogroup" className="flex flex-col gap-3 mt-5">
      {options.map((opt) => (
        <label
          htmlFor={`radio-${opt.value}`}
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            id={`radio-${opt.value}`}
            type="radio"
            name="radio-group"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={`w-full rounded-3xl px-2 py-1 text-center transition-colors duration-150
      ${value === opt.value ? 'bg-secondary shadow-[inset_0_0_6px_rgba(255,196,1,1)]' : 'bg-gray-dark/30'} 
      hover:bg-secondary/100 `}
          >
            <span>{opt.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
export default ChatRadio;
