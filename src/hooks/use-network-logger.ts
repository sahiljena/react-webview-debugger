import { useEffect, useRef } from "react";

export const useNetworkLogger = () => {
  const logs = useRef<any[]>([]);

  useEffect(() => {
    const original = window.fetch;

    window.fetch = async (url, options) => {
      const start = Date.now();
      const response = await original(url, options);

      const clone = response.clone();
      const text = await clone.text().catch(() => null);

      logs.current.push({
        url,
        method: options?.method || "GET",
        status: response.status,
        duration: Date.now() - start,
        requestBody: options?.body,
        responseBody: text,
      });

      return response;
    };

    return () => {
      window.fetch = original;
    };
  }, []);

  return { networkLogs: logs.current };
};
