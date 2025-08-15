import React, { useEffect, useRef, useState } from "react";

export default function BannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const adContainerRef = useRef(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    let adLoadTimeout;

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
        
        // Set a timeout to show fallback if ad doesn't load
        adLoadTimeout = setTimeout(() => {
          if (adContainerRef.current && adContainerRef.current.children.length <= 1) {
            console.log("Ad didn't load, showing fallback");
            setShowFallback(true);
          }
        }, 3000);
      };
      
      script.onerror = (e) => {
        console.error("Adcash banner script failed to load:", e);
        setShowFallback(true);
      };
      
      // Append the script to the ad container
      adContainerRef.current.appendChild(script);
      
    } catch (e) {
      console.error("Adcash banner injection error:", e);
      setShowFallback(true);
    }

    // Cleanup function
    return () => {
      if (adLoadTimeout) {
        clearTimeout(adLoadTimeout);
      }
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
          width: '300px', 
          height: '250px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          position: 'relative'
        }}
      >
        {showFallback && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '10px', fontSize: '16px' }}>📢</div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Advertisement</div>
            <div>Supporting GetRentals</div>
          </div>
        )}
      </div>
      {!adLoaded && !showFallback && (
        <p style={{ textAlign: "center", lineHeight: "24px", marginTop: 8, color: "#666", fontSize: '12px' }}>
          Loading advertisement...
        </p>
      )}
    </div>
  );
}