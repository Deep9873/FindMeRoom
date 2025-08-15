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
      
      script.onload = () => {
        console.log("Adcash script loaded successfully");
        setAdLoaded(true);
        
        // Try to trigger ad loading after a delay
        setTimeout(() => {
          if (win.atOptions && typeof win.atInit === 'function') {
            console.log("Calling atInit");
            win.atInit();
          }
        }, 1000);
      };
      
      script.onerror = (e) => {
        console.error("Adcash banner script failed to load:", e);
        console.warn("Adcash banner (iframe) script failed to load.");
      };
      
      doc.body.appendChild(script);
      
      // Add some debug styling to make sure iframe is working
      doc.body.style.background = 'rgba(255, 0, 0, 0.1)';
      doc.body.style.border = '1px dashed blue';
      doc.body.style.minHeight = '250px';
      doc.body.style.display = 'flex';
      doc.body.style.alignItems = 'center';
      doc.body.style.justifyContent = 'center';
      
      // Add a fallback message
      const fallback = doc.createElement('div');
      fallback.innerHTML = 'Loading Advertisement...';
      fallback.style.color = '#666';
      fallback.style.fontSize = '14px';
      fallback.style.textAlign = 'center';
      doc.body.appendChild(fallback);
      
    } catch (e) {
      console.error("Adcash banner injection error:", e);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <AdFrame
        title="adcash-banner-sandbox"
        width={300}
        height={250}
        onReady={handleReady}
        style={{ 
          minWidth: '300px', 
          minHeight: '250px',
          maxWidth: '300px',
          maxHeight: '250px',
          display: 'block'
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