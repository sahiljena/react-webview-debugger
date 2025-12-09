import { NetworkLog } from "../../hooks/use-network-logger";
import { copyToClipboard } from "../../utils/copy-to-clipboard";

export const NetworkTab = ({
  networkCalls,
}: {
  networkCalls: NetworkLog[];
}) => {
  return (
    <div
      style={{
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        height: "100%",
        overflowY: "auto",
        background: "rgba(20, 20, 20, 0.9)",
      }}
    >
      {networkCalls.map((call, i) => (
        <div
          key={i}
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              wordBreak: "break-all",
            }}
          >
            {call.url}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                padding: "2px 6px",
                borderRadius: "4px",
                background: "#444",
                color: "white",
                fontSize: "11px",
              }}
            >
              {call.method}
            </span>

            <span
              style={{
                color:
                  call.status >= 200 && call.status < 300
                    ? "#4ade80"
                    : call.status >= 400
                    ? "#f87171"
                    : "#facc15",
                fontWeight: 600,
              }}
            >
              {call.status}
            </span>

            <span style={{ color: "#aaa" }}>{call.duration}ms</span>
          </div>

          <button
            onClick={() => copyToClipboard(call.curl)}
            style={{
              alignSelf: "flex-start",
              padding: "6px 10px",
              borderRadius: "6px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Copy cURL
          </button>
        </div>
      ))}
    </div>
  );
};
