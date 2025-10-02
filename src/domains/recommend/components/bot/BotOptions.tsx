interface Option {
  label: string;
  value: string;
}

interface BotOptionsProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  step: number;
  currentStep: number;
}

function BotOptions({ options, value, onChange, step, currentStep }: BotOptionsProps) {
  return (
    <div role="radiogroup" className="flex flex-col gap-3 mt-5">
      {options.map((opt) => (
        <label
          htmlFor={`radio_${opt.value}_${step}`}
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            id={`radio_${opt.value}_${step}`}
            type="radio"
            name={`radio_group_${step}`}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            disabled={currentStep > step && value !== opt.value}
            className="sr-only"
          />
          <span
            className={`w-full rounded-3xl px-2 py-1 text-center transition-colors duration-150
              ${
                value === opt.value
                  ? 'bg-secondary shadow-[inset_0_0_6px_rgba(255,196,1,1)]'
                  : 'bg-gray-light'
              } 
              ${currentStep > step && value !== opt.value ? 'cursor-not-allowed bg-gray-light' : 'hover:bg-secondary'}`}
          >
            <span>{opt.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
export default BotOptions;
