import React, { useEffect, useRef, useState } from "react";

export default function BannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);
  const slotRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const container = slotRef.current || document.getElementById("banner-ad-slot");
    if (!container) {
      console.warn("Banner ad container not found. Skipping script injection.");
      return () => {};
    }

    // Create the atOptions global variable for the vendor script
    window.atOptions = {
      key: "b7d32cc67e74ff67735ed16f9ea69688",
      format: "iframe",
      height: 250,
      width: 300,
      params: {}
    };

    // Avoid duplicate injection
    if (container.dataset.adInjected === "true") {
      setAdLoaded(true);
      return () => {};
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//www.highperformanceformat.com/b7d32cc67e74ff67735ed16f9ea69688/invoke.js";
    script.async = true;

    script.onload = () => setAdLoaded(true);
    script.onerror = () => console.warn("Banner ad script failed to load.");

    try {
      container.appendChild(script);
      container.dataset.adInjected = "true";
      scriptRef.current = script;
    } catch (e) {
      console.warn("Failed to append banner ad script:", e);
    }

    return () => {
      try {
        const c = slotRef.current || document.getElementById("banner-ad-slot");
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        }
        if (c) {
          c.removeAttribute("data-ad-injected");
          while (c.firstChild) {
            try {
              c.removeChild(c.firstChild);
            } catch (_) {
              break;
            }
          }
        }
      } catch (err) {
        console.warn("Banner ad cleanup warning:", err);
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={slotRef}
        id="banner-ad-slot"
        style={{ width: 300, height: 250, background: "#f0f0f0" }}
      >
        {!adLoaded && (
          <p style={{ textAlign: "center", lineHeight: "250px" }}>Loading ad...</p>
        )}
      </div>
    </div>
  );
}