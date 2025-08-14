import React, { useEffect, useRef, useState } from 'react';

const AdcashBanner = ({ className = "" }) => {
  const bannerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const [adError, setAdError] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Only load the script once
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      
      // Enhanced error handling and timing
      const loadAd = () => {
        try {
          if (window.aclib && bannerRef.current) {
            // Ensure container exists and is in DOM
            if (document.contains(bannerRef.current)) {
              console.log('Loading Adcash banner with zone ID 10269738');
              window.aclib.runBanner({
                zoneId: '10269738',
              });
              setAdLoaded(true);
            } else {
              console.warn('Adcash banner container not in DOM');
              setAdError(true);
            }
          } else {
            // Retry if aclib not loaded yet, with maximum retry limit
            const retryCount = scriptLoadedRef.current.retryCount || 0;
            if (retryCount < 10) {
              scriptLoadedRef.current.retryCount = retryCount + 1;
              setTimeout(loadAd, 500);
            } else {
              console.warn('Adcash library failed to load after 10 retries');
              setAdError(true);
            }
          }
        } catch (error) {
          console.error('Error loading Adcash banner:', error);
          setAdError(true);
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
        <small className="text-gray-400 text-xs">Advertisement space temporarily unavailable</small>
      </div>
    );
  }

  return (
    <div className={`adcash-banner-container ${className}`} ref={bannerRef}>
      <div className="text-center mb-2">
        <small className="text-gray-500 text-xs">Advertisement</small>
      </div>
      <div id="adcash-banner-zone" className="min-h-[90px] bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
        {!adLoaded && (
          <div className="text-center p-4">
            <div className="animate-pulse text-gray-400 text-sm">Loading ad...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdcashBanner;