import { useEffect, useState } from "react";

export interface NetworkLog {
  url: string;
  method: string;
  status: number;
  duration: number;
  requestBody: any;
  responseBody: any;
  curl: string;
}

export const useNetworkLogger = () => {
  const [logs, setLogs] = useState<NetworkLog[]>([]);

  useEffect(() => {
    const original = window.fetch;

    window.fetch = async (url: any, options: any = {}) => {
      const start = Date.now();

      const response = await original(url, options);

      const clone = response.clone();
      const text = await clone.text().catch(() => null);

      const method = options.method || "GET";
      const headers = options.headers || {};
      const body = options.body;

      const headerStr = Object.entries(headers)
        .map(([k, v]) => `-H "${k}: ${v}"`)
        .join(" ");

      const bodyStr = body ? `--data '${body}'` : "";

      const curlCmd = `curl -X ${method} ${headerStr} ${bodyStr} "${url}"`;
      const log: NetworkLog = {
        url,
        method,
        status: response.status,
        duration: Date.now() - start,
        requestBody: body,
        responseBody: text,
        curl: curlCmd,
      };

      setLogs((prev) => [log, ...prev]);

      return response;
    };

    return () => {
      window.fetch = original;
    };
  }, []);

  return { networkLogs: logs };
};
