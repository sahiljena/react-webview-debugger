import React, { useState, useMemo, useRef, useEffect } from "react";
import { downloadLogs } from "../utils/download-logs";
import { EditableBlock } from "./editable-block";
import { CURATED_FEATURES, TABS } from "./constants";
import { ConsoleTab } from "./console";
import { NetworkTab } from "./network-tab";
import { IOptionalTab } from "./debugger-tool";

export const DebugPanel = ({
  consoleLogs = [],
  networkLogs,
  onClose,
  optionalTabs,
}: {
  consoleLogs: any[];
  networkLogs: any[];
  onClose: () => void;
  optionalTabs: IOptionalTab[];
}) => {
  const [tab, setTab] = useState("cookies");
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [showFullGlobals, setShowFullGlobals] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedConsoleFilter, setSelectedConsoleFilter] = useState("");
  const consoleInputRef = useRef();
  const urlInputRef = useRef();

  const [cookies, setCookies] = useState(() =>
    document.cookie.split(";").map((c) => {
      const [key, ...rest] = c.trim().split("=");
      return { key, value: rest.join("=") };
    })
  );

  const [local, setLocal] = useState(() =>
    Object.entries({ ...localStorage }).map(([key, value]) => ({ key, value }))
  );

  const [session, setSession] = useState(() =>
    Object.entries({ ...sessionStorage }).map(([key, value]) => ({
      key,
      value,
    }))
  );

  const filteredCookies = useMemo(
    () =>
      cookies.filter((x) => (x.key + x.value).toLowerCase().includes(search)),
    [cookies, search]
  );

  const filteredLocal = useMemo(
    () => local.filter((x) => (x.key + x.value).toLowerCase().includes(search)),
    [local, search]
  );

  const filteredSession = useMemo(
    () =>
      session.filter((x) => (x.key + x.value).toLowerCase().includes(search)),
    [session, search]
  );

  const filteredConsole = useMemo(() => {
    return consoleLogs?.filter(
      (c: any) =>
        (!!search ? JSON.stringify(c).toLowerCase().includes(search) : true) &&
        (!!selectedConsoleFilter ? c.type === selectedConsoleFilter : true)
    );
  }, [consoleLogs, search, selectedConsoleFilter]);

  const filteredNetwork = useMemo(() => {
    if (!search) return networkLogs;
    return networkLogs.filter((n: any) =>
      JSON.stringify(n).toLowerCase().includes(search)
    );
  }, [networkLogs, search]);

  const allTabs = useMemo(() => {
    const modifiedOptionalTabs = optionalTabs.map((tab) => {
      return { key: tab.tabKey, label: tab.tabName };
    });
    return [...TABS, ...modifiedOptionalTabs];
  }, [optionalTabs]);

  const findComponenToRender = useMemo(() => {
    const filteredComponent = optionalTabs?.filter(
      (opTab) => opTab.tabKey === tab
    )?.[0];
    return filteredComponent;
  }, [optionalTabs, tab]);

  const handleCookieSave = (key: string, newVal: string) => {
    if (!document) return;
    document.cookie = `${key}=${newVal}`;
    setCookies((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value: newVal } : c))
    );
  };

  const handleCookieDelete = (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    setCookies((prev) => prev.filter((c) => c.key !== key));
  };

  const handleLocalSave = (key: string, newVal: string) => {
    localStorage.setItem(key, newVal);
    setLocal((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value: newVal } : c))
    );
  };

  const handleLocalDelete = (key: string) => {
    localStorage.removeItem(key);
    setLocal((prev) => prev.filter((c) => c.key !== key));
  };

  const handleSessionSave = (key: string, newVal: string) => {
    sessionStorage.setItem(key, newVal);
    setSession((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value: newVal } : c))
    );
  };

  const handleSessionDelete = (key: string) => {
    sessionStorage.removeItem(key);
    setSession((prev) => prev.filter((c) => c.key !== key));
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const handleAdd = () => {
    if (!newKey) return;

    if (tab === "cookies") {
      document.cookie = `${newKey}=${newValue}`;
      setCookies((prev) => [...prev, { key: newKey, value: newValue }]);
    } else if (tab === "local") {
      localStorage.setItem(newKey, newValue);
      setLocal((prev) => [...prev, { key: newKey, value: newValue }]);
    } else if (tab === "session") {
      sessionStorage.setItem(newKey, newValue);
      setSession((prev) => [...prev, { key: newKey, value: newValue }]);
    }

    setNewKey("");
    setNewValue("");
    setAdding(false);
  };

  const tabButton = (t: any) => ({
    padding: "6px 12px",
    fontSize: 13,
    background: t.key === tab ? "#1e1e1e" : "#2d2d2d",
    border: "1px solid #444",
    borderBottom: t.key === tab ? "2px solid #00aaff" : "1px solid #444",
    cursor: "pointer",
    color: "white",
    borderRadius: "4px 4px 0 0",
  });

  const currentList =
    tab === "cookies"
      ? filteredCookies
      : tab === "local"
      ? filteredLocal
      : tab === "session"
      ? filteredSession
      : [];

  const checkFeature = (feat: string) => {
    try {
      if (feat === "serviceWorker") return "serviceWorker" in navigator;
      if (feat === "indexedDB") return "indexedDB" in window;
      if (feat === "localStorage") return "localStorage" in window;
      return typeof (window as any)[feat] !== "undefined";
    } catch {
      return false;
    }
  };

  const fullGlobals = useMemo(() => {
    const obj: Record<string, boolean> = {};
    Object.getOwnPropertyNames(window).forEach((key) => {
      try {
        obj[key] = typeof (window as any)[key] !== "undefined";
      } catch {
        obj[key] = false;
      }
    });
    return obj;
  }, []);

  const handleConsoleTypeSelector = (consoleMethod: string) => {
    setSelectedConsoleFilter((prev) => {
      if (prev === consoleMethod) return "";
      return consoleMethod;
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        height: isFullScreen ? "98vh" : "60vh",
        background: "#1e1e1e",
        color: "#eee",
        borderTop: "1px solid #444",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000000,
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid #333",
          background: "#111",
        }}
      >
        <strong style={{ fontSize: 14 }}>WebView Debugger</strong>
        <div style={{ gap: "10px", display: "flex" }}>
          <button
            onClick={toggleFullScreen}
            style={{
              background: "transparent",
              border: "none",
              color: "#aaa",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {isFullScreen ? "━" : "⛶"}
          </button>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#aaa",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "6px 10px",
          borderBottom: "1px solid #333",
          background: "#151515",
          flexWrap: "wrap",
        }}
      >
        {allTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setSearch("");
              setTab(t.key);
            }}
            style={tabButton(t)}
          >
            {t.label}
          </button>
        ))}

        {["cookies", "local", "session"].includes(tab) && (
          <button
            onClick={() => setAdding((prev) => !prev)}
            style={{
              marginLeft: 10,
              padding: "6px 12px",
              fontSize: 13,
              background: "#007acc",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            + Add
          </button>
        )}
      </div>
      {tab !== "download" && tab !== "urlEditor" && (
        <div style={{ padding: "8px 12px", background: "#111" }}>
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            style={{
              width: "100%",
              padding: "6px 10px",
              background: "#222",
              border: "1px solid #444",
              color: "white",
              borderRadius: 4,
              fontFamily: "monospace",
            }}
          />
        </div>
      )}
      {adding && (
        <div style={{ background: "#111" }}>
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              gap: 6,
            }}
          >
            <input
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              style={{
                padding: "4px 6px",
                flex: 1,
                background: "#222",
                color: "white",
                border: "1px solid #444",
                borderRadius: 4,
              }}
            />
            <input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              style={{
                padding: "4px 6px",
                flex: 1,
                background: "#222",
                color: "white",
                border: "1px solid #444",
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
            <button
              onClick={handleAdd}
              style={{
                padding: "4px 8px",
                background: "#2a7",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <button
              onClick={() => setAdding(false)}
              style={{
                padding: "4px 8px",
                background: "#a22",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {tab === "console" && (
        <div style={{ width: "100%" }}>
          <input
            ref={consoleInputRef}
            style={{
              padding: "6px 10px",
              background: "#222",
              border: "1px solid #444",
              color: "white",
              borderRadius: 4,
              fontFamily: "monospace",
              margin: "6px",
              width: "80%",
            }}
            placeholder="Console Input>"
          />
          <button
            style={{
              padding: "4px 14px",
              background: "#007acc",
              borderRadius: 4,
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
            }}
            onClick={() => {
              try {
                const result = Function(
                  `"use strict"; return (${consoleInputRef.current.value});`
                )();
                console.log(result);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Run^
          </button>
        </div>
      )}
      {tab === "urlEditor" && (
        <div
          style={{
            padding: "10px",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            style={{
              width: "100%",
              padding: "6px 10px",
              background: "#222",
              border: "1px solid #444",
              color: "white",
              borderRadius: 4,
              fontFamily: "monospace",
            }}
            defaultValue={window.location.href}
            ref={urlInputRef}
          />
          <button
            style={{
              padding: "4px 14px",
              background: "#007acc",
              borderRadius: 4,
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
              width: "100%",
            }}
            onClick={() => (window.location.href = urlInputRef.current.value)}
          >
            Go ^
          </button>
        </div>
      )}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          fontSize: 13,
        }}
      >
        {["cookies", "local", "session"].includes(tab) &&
          currentList.map((item) => (
            <EditableBlock
              key={item.key}
              vKey={item.key}
              value={item.value}
              onSave={(val) => {
                if (tab === "cookies") handleCookieSave(item.key, val);
                if (tab === "local") handleLocalSave(item.key, val);
                if (tab === "session") handleSessionSave(item.key, val);
              }}
              onDelete={() => {
                if (tab === "cookies") handleCookieDelete(item.key);
                if (tab === "local") handleLocalDelete(item.key);
                if (tab === "session") handleSessionDelete(item.key);
              }}
            />
          ))}
        {tab === "console" && (
          <ConsoleTab
            handleConsoleTypeSelector={handleConsoleTypeSelector}
            consoles={filteredConsole}
            selectedConsoleFilter={selectedConsoleFilter}
          />
        )}
        {tab === "network" && <NetworkTab networkCalls={filteredNetwork} />}
        {tab === "download" && (
          <button
            onClick={() =>
              downloadLogs({
                cookies,
                local,
                session,
                consoleLogs,
                networkLogs,
              })
            }
            style={{
              padding: "10px 16px",
              background: "#007acc",
              borderRadius: 4,
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Download Logs as JSON
          </button>
        )}
        {tab === "features" && (
          <div>
            <h4>Important Features</h4>
            {CURATED_FEATURES.map((feat) => {
              const available = checkFeature(feat);
              return (
                <div key={feat} style={{ color: available ? "#0f0" : "#f44" }}>
                  {feat}: {available ? "Supported ✅" : "Not Supported ❌"}
                </div>
              );
            })}

            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => setShowFullGlobals(!showFullGlobals)}
                style={{
                  padding: "4px 8px",
                  background: "#007acc",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  marginBottom: 6,
                }}
              >
                {showFullGlobals ? "Hide Full Globals" : "Show Full Globals"}
              </button>

              {showFullGlobals && (
                <div
                  style={{
                    maxHeight: "40vh",
                    overflowY: "auto",
                    marginTop: 6,
                    background: "#111",
                    padding: 6,
                    borderRadius: 4,
                    border: "1px solid #333",
                  }}
                >
                  {Object.entries(fullGlobals).map(([key, val]) => (
                    <div key={key} style={{ color: val ? "#0f0" : "#f44" }}>
                      {key}: {val ? "✅" : "❌"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {findComponenToRender?.component && (
          <>{findComponenToRender.component}</>
        )}
      </div>
    </div>
  );
};
