import React, { useCallback, useState } from "react";
import AdFrame from "./AdFrame";

// Profitablerate CPM native ad sandboxed
export default function NativeBannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);

  const handleReady = useCallback(({ win, doc }) => {
    try {
      // Container required by vendor script
      const container = doc.createElement("div");
      container.id = "container-72acf036ac9f4321793bffe13ce035a5";
      container.style.width = "100%";
      doc.body.appendChild(container);

      const script = doc.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "//pl27416512.profitableratecpm.com/72acf036ac9f4321793bffe13ce035a5/invoke.js";
      script.onload = () => setAdLoaded(true);
      script.onerror = () => {
        // eslint-disable-next-line no-console
        console.warn("NativeAd (iframe) script failed to load.");
      };
      doc.body.appendChild(script);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("NativeAd (iframe) injection error", e);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AdFrame
        title="native-ad-sandbox"
        width="100%"
        height={300}
        onReady={handleReady}
        style={{ 
          minWidth: '100%', 
          minHeight: '300px',
          width: '100%',
          height: '300px',
          display: 'block',
          overflow: 'visible'
        }}
      />
      {!adLoaded && (
        <p style={{ textAlign: "center", lineHeight: "24px", marginTop: 8, color: "#666" }}>
          Loading ad...
        </p>
      )}
    </div>
  );
}