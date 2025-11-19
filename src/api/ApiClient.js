// module: apiClient
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// function: buildUrl
const buildUrl = (path, query) => {
  const url = `${BASE_URL}${path}`;

  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};

// function: request
const request = async (method, path, options = {}) => {
  const { query, body, headers } = options;

  const url = buildUrl(path, query);

  const fetchOptions = {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
  };

  if (body && method !== "GET" && method !== "DELETE") {
    fetchOptions.body = JSON.stringify(body);
  }
  
  const response = await fetch(url, fetchOptions);
  const contentType = response.headers.get("Content-Type") || "";

  let data;
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error("API request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// object: apiClient
export const apiClient = {
  get: (path, options) => request("GET", path, options),
  post: (path, options) => request("POST", path, options),
  put: (path, options) => request("PUT", path, options),
  delete: (path, options) => request("DELETE", path, options),
};
