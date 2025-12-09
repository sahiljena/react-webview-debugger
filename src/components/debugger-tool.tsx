"use client";

import React, { useState } from "react";
import { useConsoleLogger } from "../hooks/use-console-logger";
import { useNetworkLogger } from "../hooks/use-network-logger";
import { DebugPanel } from "./dubugger-pannel";

export const DebuggerTool = () => {
  const [open, setOpen] = useState(false);

  const { consoleLogs } = useConsoleLogger();
  const { networkLogs } = useNetworkLogger();

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 99999,
          cursor: "pointer",
          background: "#000",
          color: "#fff",
          borderRadius: "50%",
          width: 45,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setOpen(!open)}
      >
        🔧
      </div>

      {open && (
        <DebugPanel
          consoleLogs={consoleLogs}
          networkLogs={networkLogs}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
