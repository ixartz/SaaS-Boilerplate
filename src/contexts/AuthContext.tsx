import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSessionToken } from "../components/utils/sessionHelper";
import { useLoginRadiusSDK } from "../lib/loginradius-react-sdk";

type AuthContextType = {
  isReady: boolean;
  isAuthenticated: boolean;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading: sdkLoading } = useLoginRadiusSDK();
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Single sync function so all listeners do the same thing
  const syncToken = () => setToken(getSessionToken());

  // Initial read after SDK is loaded
  useEffect(() => {
    if (sdkLoading) return;
    syncToken();
    setReady(true);
  }, [sdkLoading]);

  // Keep in sync:
  // - same tab: custom "lr:auth-change" fired by sessionHelper
  // - other tabs: "storage" events
  // - after redirects or page regains focus: "visibilitychange"/"focus"
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      // If key is null (clear) or one of our keys, re-sync
      if (
        e.key === null ||
        e.key === "LRTokenKey" ||        // sessionStorage key
        e.key === "lr-session-token"     // cookie mirror key (some browsers surface cookie changes)
      ) {
        syncToken();
      }
    };

    const onAuthChange = () => syncToken();
    const onVisibility = () => {
      if (!document.hidden) syncToken();
    };
    const onFocus = () => syncToken();

    window.addEventListener("storage", onStorage);
    window.addEventListener("lr:auth-change", onAuthChange as EventListener);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("lr:auth-change", onAuthChange as EventListener);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    isReady: ready,
    isAuthenticated: !!token,   // single source of truth = token presence
    token,
  }), [ready, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
