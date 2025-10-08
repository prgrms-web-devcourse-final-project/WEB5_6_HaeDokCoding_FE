import { useRef } from 'react';

type SelectedOptions = {
  selectedSearchType?: string;
  selectedAlcoholStrength?: string;
  selectedAlcoholBaseType?: string;
  selectedCocktailType?: string;
};

export function useSelectedOptions() {
  const selectedOptions = useRef<SelectedOptions>({});

  const setOption = (key: keyof SelectedOptions, value: string) => {
    selectedOptions.current[key] = value;
  };

  const setStepOption = (step: number, value: string) => {
    if (step === 2) selectedOptions.current.selectedAlcoholStrength = value;
    if (step === 3) selectedOptions.current.selectedAlcoholBaseType = value;
    // if (step === 4) selectedOptions.current.selectedCocktailType = value;
  };

  const reset = () => {
    selectedOptions.current = {};
  };

  return {
    selectedOptions,
    setOption,
    setStepOption,
    reset,
  };
}
