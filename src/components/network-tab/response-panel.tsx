import { useState } from "react";
interface INetworkResponsePanel {
  response: string;
}
export const ResponsePanel = ({ response }: INetworkResponsePanel) => {
  const [showResponse, setShowResponse] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowResponse((prev) => !prev)}
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
        {showResponse ? "Hide Response" : " Show Response"}
      </button>
      {showResponse && (
        <pre
          style={{
            color: "#ff6464",
            background: "rgb(17, 17, 17)",
            borderRadius: "12px",
            whiteSpace: "pre-wrap",
            padding: "10px",
            marginTop: "12px",
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};
