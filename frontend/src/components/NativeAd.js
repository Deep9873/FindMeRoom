import React, { useEffect, useRef, useState } from "react";

export default function NativeBannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    // Guard: ensure DOM container exists before injecting script
    const container = containerRef.current || document.getElementById("container-72acf036ac9f4321793bffe13ce035a5");
    if (!container) {
      console.warn("NativeAd container not found. Skipping script injection.");
      return () => {};
    }

    // Avoid duplicate loads if effect re-runs (e.g., StrictMode in dev)
    if (container.dataset.adInjected === "true") {
      setAdLoaded(true);
      return () => {};
    }

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27416512.profitableratecpm.com/72acf036ac9f4321793bffe13ce035a5/invoke.js";

    script.onload = () => setAdLoaded(true);
    script.onerror = () => console.warn("NativeAd script failed to load.");

    try {
      container.appendChild(script);
      container.dataset.adInjected = "true";
      scriptRef.current = script;
    } catch (e) {
      console.warn("Failed to append NativeAd script:", e);
    }

    return () => {
      // Cleanup defensively: only detach our injected script tag, never mutate vendor-created children
      try {
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        }
        const c = containerRef.current || document.getElementById("container-72acf036ac9f4321793bffe13ce035a5");
        if (c) {
          c.removeAttribute("data-ad-injected");
        }
      } catch (err) {
        console.warn("NativeAd cleanup warning:", err);
      }
    };
  }, []);

  return (
    <div>
      {/* Keep the ad container empty so React doesn't manage vendor DOM children */}
      <div
        ref={containerRef}
        id="container-72acf036ac9f4321793bffe13ce035a5"
        style={{ width: "100%", minHeight: "90px", background: "#f0f0f0" }}
      />
      {!adLoaded && (
        <p style={{ textAlign: "center", lineHeight: "24px", marginTop: 8, color: "#666" }}>
          Loading ad...
        </p>
      )}
    </div>
  );
}