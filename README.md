# **React WebView Debugger**

<img src="https://res.cloudinary.com/sahiljena/image/upload/v1765015153/Screenshot_2025-12-06_at_3.18.57_PM_lf27qi.png"/>
<p align="center">
  <img src="https://res.cloudinary.com/sahiljena/image/upload/v1765301595/Screenshot_2025-12-09_at_10.40.03_PM_am6nru.png" width="45%" />
  <img src="https://res.cloudinary.com/sahiljena/image/upload/v1765301595/Screenshot_2025-12-09_at_11.02.10_PM_pnejef.png" width="45%" />
</p>

A powerful, plug-and-play **debugging panel for WebViews, PWAs, and web apps**.
Inspect storage, track network calls, edit url, monitor console errors, and check browser capabilities — **all directly inside your app**, without USB cables or external DevTools.

If you’ve ever struggled to debug a mobile WebView… this tool is built for you.

---

## **📦 Installation**

```bash
npm install @sahiljena/react-webview-debugger
# or
yarn add @sahiljena/react-webview-debugger
```

---

## **🚀 Get Started in Seconds**

Drop it anywhere in your app:

```tsx
"use client";
import { DebuggerTool } from "@sahiljena/react-webview-debugger";

export default function App() {
  return (
    <>
      <DebuggerTool />
      <h1>My App</h1>
    </>
  );
}
```

That’s it.
The debugger immediately starts capturing:

- Cookies
- localStorage & sessionStorage
- Network requests and cURL
- Fully functional console
- URL Editor
- Environment features like `SharedArrayBuffer`

No setup. No configuration. No hassle.

---

## **✨ What Makes It Awesome**

- **Live inspection** of cookies, localStorage, and sessionStorage
- **Edit, delete, and create** storage entries effortlessly
- **Real-time console tracking**
- **URL Editor** change webview url easily
- **Network request viewer** with searchable logs
- **One-click export**: Receive a compressed JSON containing _everything_
- **Feature detector**: Instantly check browser API support

---

## **🔧 Recommended Usage**

Add an environment flag to show the debugger only in dev builds:

```tsx
{
  process.env.NEXT_PUBLIC_DEBUG === "true" && <DebuggerTool />;
}
```

> Note: Console & network logs refresh when switching between tabs (auto-refresh coming soon).

---

## **Links**

- **GitHub:** [https://github.com/sahiljena/react-webview-debugger](https://github.com/sahiljena/react-webview-debugger)
- **NPM:** [https://www.npmjs.com/package/@sahiljena/react-webview-debugger](https://www.npmjs.com/package/@sahiljena/react-webview-debugger)

---

## **License**

MIT © Sahil Jena

---
