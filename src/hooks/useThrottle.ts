import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(initValue: T, listeningValue: T, interval = 1000) {
  const [throttledValue, setThrottledValue] = useState(initValue);
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();

    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(listeningValue);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(listeningValue);
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [listeningValue, interval]);

  return throttledValue;
}
