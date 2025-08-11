import React, { useEffect, useRef, useState } from 'react';

const AdcashBanner = ({ className = "" }) => {
  const bannerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Only load the script once
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      
      // Enhanced error handling and timing
      const loadAd = () => {
        if (window.aclib && bannerRef.current) {
          try {
            // Ensure container exists and is in DOM
            if (document.contains(bannerRef.current)) {
              window.aclib.runBanner({
                zoneId: '10269738',
              });
            } else {
              console.warn('Adcash banner container not in DOM');
              setAdError(true);
            }
          } catch (error) {
            console.error('Error loading Adcash banner:', error);
            setAdError(true);
          }
        } else {
          // Retry if aclib not loaded yet
          setTimeout(loadAd, 500);
        }
      };

      // Wait for DOM to be fully ready
      if (document.readyState === 'complete') {
        setTimeout(loadAd, 100);
      } else {
        window.addEventListener('load', () => setTimeout(loadAd, 100));
      }
    }
  }, []);

  if (adError) {
    return (
      <div className={`adcash-banner-container ${className} text-center p-4`}>
        <small className="text-gray-400 text-xs">Ad temporarily unavailable</small>
      </div>
    );
  }

  return (
    <div className={`adcash-banner-container ${className}`} ref={bannerRef}>
      <div className="text-center mb-2">
        <small className="text-gray-500 text-xs">Advertisement</small>
      </div>
      <div id="adcash-banner-zone">
        {/* Banner will be loaded here by aclib */}
      </div>
    </div>
  );
};

export default AdcashBanner;