import { useEffect, useRef } from "react";

export const useConsoleLogger = () => {
  const errors = useRef<any[]>([]);

  useEffect(() => {
    const original = console.error;

    console.error = (...args) => {
      errors.current.push({
        timestamp: Date.now(),
        args,
      });

      original(...args);
    };

    return () => {
      console.error = original;
    };
  }, []);

  return { consoleErrors: errors.current };
};
