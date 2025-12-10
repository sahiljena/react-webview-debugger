export const CURATED_FEATURES = [
  "SharedArrayBuffer",
  "BigInt",
  "WebAssembly",
  "OffscreenCanvas",
  "serviceWorker",
  "indexedDB",
  "localStorage",
  "fetch",
  "WebSocket",
  "crypto",
  "Notification",
  "AudioContext",
  "requestIdleCallback",
];

export const TABS = [
  { key: "cookies", label: "Cookies" },
  { key: "local", label: "LocalStorage" },
  { key: "session", label: "SessionStorage" },
  { key: "console", label: "Console" },
  { key: "network", label: "Network" },
  { key: "features", label: "Features" },
  { key: "download", label: "Download" },
  { key: "urlEditor", label: "URL Editior" },
];

export const CONSOLE_METHODS = ["log", "warn", "error", "info", "debug"];

export const CONSOLE_COLOR_MAP: Record<
  (typeof CONSOLE_METHODS)[number],
  string
> = {
  log: "#9CA3AF", // gray-400
  info: "#3B82F6", // blue-500
  warn: "#F59E0B", // amber-500
  error: "#EF4444", // red-500
  debug: "#8B5CF6", // violet-500
};
