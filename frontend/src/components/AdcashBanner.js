import React, { useCallback, useState } from "react";
import AdFrame from "./AdFrame";

export default function BannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);

  const handleReady = useCallback(({ win, doc }) => {
    try {
      // Set global options inside iframe for the vendor script
      win.atOptions = {
        key: "b7d32cc67e74ff67735ed16f9ea69688",
        format: "iframe",
        height: 250,
        width: 300,
        params: {}
      };

      const script = doc.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "//www.highperformanceformat.com/b7d32cc67e74ff67735ed16f9ea69688/invoke.js";
      script.onload = () => setAdLoaded(true);
      script.onerror = () => {
        // eslint-disable-next-line no-console
        console.warn("Adcash banner (iframe) script failed to load.");
      };
      doc.body.appendChild(script);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Adcash banner (iframe) injection error", e);
    }
  }, []);

  return (
    <div className="inline-block">
      <AdFrame
        title="adcash-banner-sandbox"
        width={300}
        height={250}
        onReady={handleReady}
      />
      {!adLoaded && (
        <p style={{ textAlign: "center", lineHeight: "24px", marginTop: 8, color: "#666" }}>
          Loading ad...
        </p>
      )}
    </div>
  );
}