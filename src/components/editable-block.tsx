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
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: "1px solid #333",
        alignItems: "center",
      }}
    >
      {/* Key */}
      <strong style={{ width: "30%", color: "#aaa" }}>{vKey}</strong>

      {/* Value or Input */}
      {editing ? (
        <input
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          style={{
            width: "50%",
            background: "#222",
            color: "white",
            border: "1px solid #555",
            padding: "4px",
          }}
        />
      ) : (
        <span style={{ width: "50%", color: "#ccc" }}>{currentValue}</span>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 4 }}>
        {editing ? (
          <>
            <button
              onClick={() => {
                onSave(currentValue);
                setEditing(false);
              }}
              style={{
                background: "#2a7",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setCurrentValue(value);
                setEditing(false);
              }}
              style={{
                background: "#a22",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              style={{
                background: "#444",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              style={{
                background: "#a22",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
