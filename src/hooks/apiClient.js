// module: apiClient
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// function: buildUrl
const buildUrl = (path, query) => {
  // Step 1: Resolve the base target for the API (env value or browser origin fallback)
  const baseTarget = BASE_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost");

  // Step 2: Use an absolute path as-is; otherwise, join with the base while preserving its pathname (e.g., "/api")
  let url;
  try {
    url = new URL(path);
  } catch {
    const baseUrl = new URL(baseTarget);
    if (!baseUrl.pathname.endsWith("/")) baseUrl.pathname = `${baseUrl.pathname}/`;
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    url = new URL(trimmedPath, baseUrl);
  }

  // Step 3: Attach any provided query parameters while ignoring empty values
  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Step 4: Return the fully constructed URL string
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
