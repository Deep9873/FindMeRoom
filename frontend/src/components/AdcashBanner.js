import React, { useEffect, useRef } from 'react';

const AdcashBanner = ({ className = "" }) => {
  const bannerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      
      // Wait a bit to ensure aclib is loaded
      const timer = setTimeout(() => {
        if (window.aclib && bannerRef.current) {
          try {
            window.aclib.runBanner({
              zoneId: '10269738',
            });
          } catch (error) {
            console.error('Error loading Adcash banner:', error);
          }
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={`adcash-banner-container ${className}`} ref={bannerRef}>
      <div className="text-center mb-2">
        <small className="text-gray-500 text-xs">Advertisement</small>
      </div>
      <div>
        <script type="text/javascript">
          {/* The aclib.runBanner script will be executed by useEffect */}
        </script>
      </div>
    </div>
  );
};

export default AdcashBanner;