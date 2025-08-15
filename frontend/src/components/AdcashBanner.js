import React, { useEffect, useRef, useState } from "react";

export default function BannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);
  const adContainerRef = useRef(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    try {
      // Clear any existing content
      adContainerRef.current.innerHTML = '';
      
      // Set global options for the vendor script
      window.atOptions = {
        key: "b7d32cc67e74ff67735ed16f9ea69688",
        format: "iframe",
        height: 250,
        width: 300,
        params: {}
      };

      // Create and load the script directly in the main document
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "//www.highperformanceformat.com/b7d32cc67e74ff67735ed16f9ea69688/invoke.js";
      
      script.onload = () => {
        console.log("Adcash script loaded successfully");
        setAdLoaded(true);
      };
      
      script.onerror = (e) => {
        console.error("Adcash banner script failed to load:", e);
        setAdLoaded(false);
      };
      
      // Append the script to the ad container
      adContainerRef.current.appendChild(script);
      
    } catch (e) {
      console.error("Adcash banner injection error:", e);
    }

    // Cleanup function
    return () => {
      // Clean up global atOptions when component unmounts
      if (window.atOptions) {
        delete window.atOptions;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        ref={adContainerRef}
        style={{ 
          minWidth: '300px', 
          minHeight: '250px',
          maxWidth: '300px',
          maxHeight: '250px',
          display: 'block',
          border: '1px dashed #ccc',
          backgroundColor: '#f9f9f9'
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