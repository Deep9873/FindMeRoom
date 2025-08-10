import React, { useEffect } from 'react';

const AdcashBanner = ({ className = "" }) => {
  useEffect(() => {
    // Initialize Adcash when component mounts
    try {
      if (window.aclib && typeof window.aclib.runBanner === 'function') {
        window.aclib.runBanner({ zoneId: '10269738' });
      }
    } catch (e) {
      console.debug('Adcash banner init skipped:', e);
    }
  }, []);

  return (
    <div className={`adcash-banner-container ${className}`}>
      {/* Adcash will inject its own iframe/banner into the DOM via runBanner */}
      <div id="ac_banner_zone_10269738" />
    </div>
  );
};

export default AdcashBanner;