import JSZip from "jszip";

export const downloadLogs = async (data: any) => {
  const zip = new JSZip();
  zip.file("debug-logs.json", JSON.stringify(data, null, 2));

  const blob = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "debug-logs.zip";
  a.click();
};
