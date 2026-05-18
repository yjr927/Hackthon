/* global window, FormData, AbortController */
(function () {
  const DEFAULT_TIMEOUT_MS = 90000;

  function normalizeBaseUrl(url) {
    return String(url || "").trim().replace(/\/+$/, "");
  }

  function getBaseUrl() {
    return normalizeBaseUrl(window.__ASL_CONFIG__?.API_BASE_URL || "http://127.0.0.1:8000");
  }

  function withTimeout(ms = DEFAULT_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), ms);
    return { controller, done: () => window.clearTimeout(timeout) };
  }

  async function readResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return response.json();
    return { detail: await response.text() };
  }

  function makeError(status, detail) {
    const message = typeof detail === "string" ? detail : detail?.detail || JSON.stringify(detail);
    const error = new Error(message || "Backend request failed");
    error.status = status;
    error.detail = detail;
    return error;
  }

  async function request(path, options = {}) {
    const { timeoutMs, ...fetchOptions } = options;
    const timer = withTimeout(timeoutMs);
    try {
      const response = await fetch(`${getBaseUrl()}${path}`, {
        ...fetchOptions,
        credentials: "include",
        signal: timer.controller.signal
      });
      const data = await readResponse(response);
      if (!response.ok) throw makeError(response.status, data);
      return data;
    } catch (error) {
      if (error.name === "AbortError") throw makeError(408, "AI analysis timed out. Please try again.");
      throw error;
    } finally {
      timer.done();
    }
  }

  async function coachVideo({ video, fileName, topk = 5, userGoal = "learn daily ASL vocabulary", targetSign = "", historyErrors = "" }) {
    if (!video) throw makeError(400, "Please record a practice video first.");

    const form = new FormData();
    form.append("video", video, fileName || "signbuddy-practice.webm");
    form.append("topk", String(topk));
    form.append("user_goal", userGoal);
    form.append("target_sign", targetSign);
    form.append("history_errors", historyErrors || "");

    return request("/coach_video", {
      method: "POST",
      body: form,
      timeoutMs: DEFAULT_TIMEOUT_MS
    });
  }

  async function apiKeyStatus() {
    return request("/user/api-key/status", { method: "GET", timeoutMs: 4000 });
  }

  async function saveApiKey(apiKey) {
    return request("/user/api-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey }),
      timeoutMs: 8000
    });
  }

  window.ASL_API = { getBaseUrl, coachVideo, apiKeyStatus, saveApiKey };
})();
