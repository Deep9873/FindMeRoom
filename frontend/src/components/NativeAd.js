import React, { useEffect, useState } from "react";

export default function NativeBannerAd() {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27416512.profitableratecpm.com/72acf036ac9f4321793bffe13ce035a5/invoke.js";

    script.onload = () => {
      setAdLoaded(true);
    };

    document.getElementById("container-72acf036ac9f4321793bffe13ce035a5").appendChild(script);

    return () => {
      // Cleanup
      document.getElementById("container-72acf036ac9f4321793bffe13ce035a5").innerHTML = "";
    };
  }, []);

  return (
    <div>
      <div
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
