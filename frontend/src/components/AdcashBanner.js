import React, { useEffect } from 'react';

const AdcashBanner = ({ className = "" }) => {
  useEffect(() => {
    // Initialize Adcash when component mounts
    if (window.aclib && window.aclib.runBanner) {
      window.aclib.runBanner({
        zoneId: '10269738',
      });
    }
  }, []);

  return (
    <div className={`adcash-banner-container ${className}`}>
      <div>
        <script 
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof aclib !== 'undefined') {
                aclib.runBanner({
                  zoneId: '10269738',
                });
              }
            `
          }}
        />
      </div>
    </div>
  );
};

export default AdcashBanner;