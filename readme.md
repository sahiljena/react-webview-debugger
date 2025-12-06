# @sahiljena/react-webview-debugger

A lightweight **React WebView Debugger** to inspect and edit cookies, localStorage, sessionStorage, console errors, and network calls — directly in your web app, **without connecting a USB** or using external dev tools.

---

## **Why this library?**

Debugging WebViews can be frustrating:

- You can’t always open Chrome DevTools on mobile.
- Editing cookies, localStorage, or sessionStorage can be cumbersome.
- Tracking network requests and console errors is not straightforward.
- Exporting all debugging data for offline analysis is tedious.
- Checking whether modern browser features (like `SharedArrayBuffer`) are available is hard.

**This library solves all of that**, giving you a **developer-friendly panel** embedded in your app:

- View, **edit, delete, or add** cookies, localStorage, and sessionStorage.
- See **console errors** in real-time.
- Inspect **network requests and responses**.
- Download a **compressed JSON** of all logs for offline analysis.
- Includes a **Features tab** showing environment capabilities and feature support (e.g., `SharedArrayBuffer`).

---

## **Installation**

```bash
npm install @sahiljena/react-webview-debugger
# or
yarn add @sahiljena/react-webview-debugger
```

---

## **Usage**

```tsx
"use client";
import { useState } from "react";
import { DebuggerTool } from "@sahiljena/react-webview-debugger";

export default function App() {
  const [showDebugger, setShowDebugger] = useState(true);

  return (
    <>
      {showDebugger && <DebuggerTool />}
      <h1>My App</h1>
    </>
  );
}
```

> ✅ That’s it! `<DebugTool />` automatically tracks:
>
> - Cookies, localStorage, sessionStorage
> - Console errors
> - Network requests/responses
> - Environment features like `SharedArrayBuffer`

No props are required unless you want to control visibility via `onClose`.

---

## **Quick One-Line Usage (Emoji-friendly)**

```tsx
<DebugTool /> ⚡ Inspect cookies, storage, console, network & features instantly!
```

---

## **Features**

- **Editable cookies, localStorage, sessionStorage**
- **Searchable console errors and network logs**
- **Add, edit, delete storage entries**
- **Export all data** to JSON for offline analysis
- **Features tab**: Shows important browser features and full globals, with support indicators ✅/❌
- **Fullscreen mode** for maximum visibility
- **Dark theme** by default

---

## **Why it’s useful**

- Quickly debug mobile WebViews **without a USB connection**.
- Inspect client-side storage dynamically.
- Track and export console and network issues.
- Check environment support for modern browser features.
- Perfect for testing apps that rely heavily on WebView content.

---

## **License**

MIT © Sahil Jena

---
