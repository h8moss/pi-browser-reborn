import { useState } from "react";

const useMultiState = <T extends object>(initialState: T): [T, (update: Partial<T> | ((prev: T) => Partial<T>)) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setMultiState = (update: Partial<T> | ((prev: T) => Partial<T>)) => {
    if (typeof update === 'function') {
      setState(prev => {
        const newPartialState = (update as (prev: T) => Partial<T>)(prev);
        const merged = { ...prev };
        (Object.keys(newPartialState) as Array<keyof T>).forEach(key => {
          if (newPartialState[key] !== undefined) {
            merged[key] = newPartialState[key]!;
          }
        });
        return merged;
      });
    } else {
      setState(prev => {
        const merged = { ...prev };
        (Object.keys(update) as Array<keyof T>).forEach(key => {
          if (update[key] !== undefined) {
            merged[key] = update[key]!;
          }
        });
        return merged;
      });
    }
  };

  return [state, setMultiState];
};

export default useMultiState;
