import { useState } from "react";

interface IEditableBlock {
  key: number;
  vKey: string;
  value: string;
  onSave: (newValue: string) => void;
  onDelete: () => void;
}

export const EditableBlock = ({
  vKey,
  value,
  onSave,
  onDelete,
}: IEditableBlock) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #333",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          color: "#aaa",
          fontSize: "0.9rem",
        }}
      >
        {vKey} :
      </div>

      {editing ? (
        <input
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          style={{
            flex: 1,
            minWidth: "140px",
            background: "#222",
            color: "white",
            border: "1px solid #555",
            padding: "6px",
            borderRadius: 4,
          }}
        />
      ) : (
        <div
          style={{
            flex: 1,
            minWidth: "140px",
            color: "#ccc",
            fontSize: "0.9rem",
            wordBreak: "break-word",
          }}
        >
          {currentValue}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: "6px",
          flexWrap: "wrap",
        }}
      >
        {editing ? (
          <>
            <button
              onClick={() => {
                onSave(currentValue);
                setEditing(false);
              }}
              style={buttonStyle("#2a7")}
            >
              Save
            </button>
            <button
              onClick={() => {
                setCurrentValue(value);
                setEditing(false);
              }}
              style={buttonStyle("#a22")}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              style={buttonStyle("#444")}
            >
              Edit
            </button>
            <button onClick={onDelete} style={buttonStyle("#a22")}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const buttonStyle = (bg: string) => ({
  background: bg,
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  color: "white",
  borderRadius: 4,
  fontSize: "0.85rem",
  flexGrow: 1, // 🔥 Makes buttons adapt on mobile
  minWidth: "70px",
});
