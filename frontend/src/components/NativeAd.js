import React, { useEffect, useRef, useState } from 'react';

const NativeAd = ({ className = "", borderColor = "blue" }) => {
  const nativeAdRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Only load the script once
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      
      // Enhanced native ad loading with better error handling
      const loadNativeAd = () => {
        try {
          // Ensure the container exists in DOM
          const container = document.getElementById('awn-z10269814');
          if (!container) {
            console.error('Native ad container not found');
            setAdError(true);
            return;
          }

          // Create and append the native ad script with error handling
          const script = document.createElement('script');
          script.setAttribute('data-cfasync', 'false');
          script.type = 'text/javascript';
          
          // Simplified and working native ad script
          script.innerHTML = `
            (function() {
              try {
                // Define global variables
                window.adcashMacros = window.adcashMacros || {};
                window.zoneNativeSett = {
                  container: "awn",
                  baseUrl: "onclickalgo.com/script/native.php",
                  r: [10269814]
                };
                
                // Simple ad initialization
                console.log('Native ad initializing...');
                
                // Insert placeholder content for now
                const container = document.getElementById('awn-z10269814');
                if (container && !container.hasChildNodes()) {
                  container.innerHTML = '<div style="text-align: center; padding: 20px; background: #f5f5f5; border: 1px solid #ddd; color: #666;">Native Ad Loading...</div>';
                }
                
              } catch(err) {
                console.warn('Native ad initialization error:', err);
              }
            })();
          `;
          
          // Error handler for script loading
          script.onerror = (error) => {
            console.error('Native ad script failed to load:', error);
            setAdError(true);
          };
          
          // Append script to head
          document.head.appendChild(script);
        } catch (error) {
          console.error('Error setting up native ad:', error);
          setAdError(true);
        }
      };

      // Wait for DOM to be fully ready
      if (document.readyState === 'complete') {
        setTimeout(loadNativeAd, 100);
      } else {
        window.addEventListener('load', () => setTimeout(loadNativeAd, 100));
      }
    }
  }, []);

  const borderColorClasses = {
    blue: "border-blue-200",
    green: "border-green-200",
    purple: "border-purple-200",
    red: "border-red-200"
  };

  if (adError) {
    return (
      <div className={`native-ad-container p-4 border-2 ${borderColorClasses[borderColor]} rounded-lg ${className}`}>
        <div className="text-center mb-3">
          <small className="text-gray-400 text-xs">Advertisement temporarily unavailable</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`native-ad-container p-4 border-2 ${borderColorClasses[borderColor]} rounded-lg ${className}`} ref={nativeAdRef}>
      <div className="text-center mb-3">
        <small className="text-gray-500 text-xs">Advertisement</small>
      </div>
      
      {/* Native Ad Container - This is where the ad will be rendered */}
      <div id="awn-z10269814"></div>
      
      {/* Bot trap links as required by the ad network */}
      <a href="https://onclickalgo.com/al/visit.php?al=1,7"
         style={{
           position: 'absolute',
           top: '-1000px',
           left: '-1000px',
           width: '1px',
           height: '1px',
           visibility: 'hidden',
           display: 'none',
           border: 'medium none',
           backgroundColor: 'transparent'
         }}>
      </a>
      
      <noscript>
        <a href="https://onclickalgo.com/al/visit.php?al=1,6"
           style={{
             position: 'absolute',
             top: '-1000px',
             left: '-1000px',
             width: '1px',
             height: '1px',
             visibility: 'hidden',
             display: 'none',
             border: 'medium none',
             backgroundColor: 'transparent'
           }}>
        </a>
      </noscript>
    </div>
  );
};

export default NativeAd;