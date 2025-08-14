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
      // Cleanup defensively: the container may already be gone or moved by the vendor script
      try {
        const c = containerRef.current || document.getElementById("container-72acf036ac9f4321793bffe13ce035a5");
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        }
        if (c) {
          // Do not blindly set innerHTML; some ad scripts move nodes around
          // Only clear if the node still exists and is safe to mutate
          c.removeAttribute("data-ad-injected");
          // Soft clear children that were created by our script if they are still attached
          // This avoids NotFoundError when nodes were already detached
          while (c.firstChild) {
            try {
              c.removeChild(c.firstChild);
            } catch (_) {
              break;
            }
          }
        }
      } catch (err) {
        // Swallow cleanup errors to avoid crashing the app
        console.warn("NativeAd cleanup warning:", err);
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        id="container-72acf036ac9f4321793bffe13ce035a5"
        style={{ width: "100%", minHeight: "90px", background: "#f0f0f0" }}
      >
        {!adLoaded && (
          <p style={{ textAlign: "center", lineHeight: "90px" }}>Loading ad...</p>
        )}
      </div>
    </div>
  );
}