import React, { useEffect, useState } from "react";

export default function BannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Create the atOptions global variable
    window.atOptions = {
      key: "b7d32cc67e74ff67735ed16f9ea69688",
      format: "iframe",
      height: 250,
      width: 300,
      params: {}
    };

    // Create and append the script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//www.highperformanceformat.com/b7d32cc67e74ff67735ed16f9ea69688/invoke.js";
    script.async = true;

    script.onload = () => {
      setAdLoaded(true);
    };

    document.getElementById("banner-ad-slot").appendChild(script);

    return () => {
      // Cleanup on unmount
      const container = document.getElementById("banner-ad-slot");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div>
      <div
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
