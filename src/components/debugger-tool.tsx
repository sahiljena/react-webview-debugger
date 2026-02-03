"use client";

import React, { useState } from "react";
import { useConsoleLogger } from "../hooks/use-console-logger";
import { useNetworkLogger } from "../hooks/use-network-logger";
import { DebugPanel } from "./dubugger-pannel";
import { useShakeDevRedirect } from "../hooks/use-device-shake";

export interface IOptionalTab {
  tabName: string;
  tabKey: string;
  component: React.ReactNode;
}

export interface IDebuggerTool {
  optionalTabs?: IOptionalTab[];
}

export const DebuggerTool = ({ optionalTabs }: IDebuggerTool) => {
  const { open, setOpen } = useShakeDevRedirect();

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
          optionalTabs={optionalTabs}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
