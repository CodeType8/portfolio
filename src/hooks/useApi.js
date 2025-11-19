// hook: useApi
import { useState, useCallback } from "react";
import { apiClient } from "../api/apiClient";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // function: callApi
  const callApi = useCallback(async (method, path, options) => {
    setLoading(true);
    setError(null);

    try {
      const methodName = method.toLowerCase();
      const clientMethod = apiClient[methodName];

      if (!clientMethod) {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }

      const result = await clientMethod(path, options);
      return result;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
};
