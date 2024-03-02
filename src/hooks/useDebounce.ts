import { useEffect, useState } from "react";

export function useDebounce<T>(initValue: T, listeningValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(initValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(listeningValue);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [listeningValue, delay]);

  if (!debouncedValue) {
    return initValue;
  }
  return debouncedValue;
}
