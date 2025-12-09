import { useEffect, useState } from "react";

export const CONSOLE_METHODS = [
  "log",
  "warn",
  "error",
  "info",
  "debug",
] as const;

type ConsoleMethod = (typeof CONSOLE_METHODS)[number];

export interface ConsoleEntry {
  type: ConsoleMethod;
  timestamp: number;
  args: any[];
}

export const useConsoleLogger = () => {
  const [logs, setLogs] = useState<ConsoleEntry[]>([]);

  useEffect(() => {
    const originals: Record<ConsoleMethod, (...args: any[]) => void> = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
    };

    CONSOLE_METHODS.forEach((method) => {
      console[method] = (...args: any[]) => {
        const entry: ConsoleEntry = {
          type: method,
          args,
          timestamp: performance.now(),
        };

        setLogs((prev) => [entry, ...prev]);

        originals[method](...args);
      };
    });

    return () => {
      CONSOLE_METHODS.forEach((method) => {
        console[method] = originals[method];
      });
    };
  }, []);

  return { consoleLogs: logs };
};
