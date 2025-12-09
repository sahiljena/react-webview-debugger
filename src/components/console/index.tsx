import { ConsoleEntry } from "../../hooks/use-console-logger";
import { CONSOLE_COLOR_MAP, CONSOLE_METHODS } from "../constants";

export const ConsoleTab = ({
  selectedConsoleFilter,
  handleConsoleTypeSelector,
  consoles,
}: {
  selectedConsoleFilter: string;
  handleConsoleTypeSelector: (type: string) => void;
  consoles: ConsoleEntry[];
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "8px",
          position: "fixed",
        }}
      >
        {CONSOLE_METHODS.map((consoleMethod) => {
          return (
            <button
              key={consoleMethod}
              style={{
                color: CONSOLE_COLOR_MAP[consoleMethod],
                background:
                  selectedConsoleFilter === consoleMethod
                    ? "rgb(3, 18, 104)"
                    : "rgb(45, 45, 45)",
                padding: "2px 8px",
                borderRadius: "8px",
              }}
              onClick={() => handleConsoleTypeSelector(consoleMethod)}
            >
              {consoleMethod}
            </button>
          );
        })}
      </div>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "40px" }}>
        {consoles.map((consoleVal) => {
          return (
            <div
              style={{ color: CONSOLE_COLOR_MAP[consoleVal.type] }}
              key={consoleVal.timestamp}
            >
              {consoleVal.args.join(" ")}
            </div>
          );
        })}
      </pre>
    </>
  );
};
