export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Text copied to clipboard");
  } catch (err) {
    alert("Failed to copy text: ");
  }
}
