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
          
          // Enhanced script with error handling
          script.innerHTML = `
            (function() {
              try {
                var adcashMacros = {};
                var zoneNativeSett={container:"awn",baseUrl:"onclickalgo.com/script/native.php",r:[10269814]};
                var urls={cdnUrls:["//superonclick.com","//geniusonclick.com"],cdnIndex:0,rand:Math.random(),events:["click","mousedown","touchstart"],useFixer:!0,onlyFixer:!1,fixerBeneath:!1};
                
                function acPrefetch(e){
                  try {
                    var t,n=document.createElement("link");
                    t=void 0!==document.head?document.head:document.getElementsByTagName("head")[0],
                    n.rel="dns-prefetch",
                    n.href=e,
                    t.appendChild(n);
                    var r=document.createElement("link");
                    r.rel="preconnect",
                    r.href=e,
                    t.appendChild(r)
                  } catch(err) {
                    console.warn('DNS prefetch error:', err);
                  }
                }
                
                var nativeInit=new function(){
                  var a="",i=Math.floor(1e12*Math.random()),o=Math.floor(1e12*Math.random()),t=window.location.protocol,c={_0:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){for(var t,n,r,a,i,o,c="",s=0;s<e.length;)a=(t=e.charCodeAt(s++))>>2,t=(3&t)<<4|(n=e.charCodeAt(s++))>>4,i=(15&n)<<2|(r=e.charCodeAt(s++))>>6,o=63&r,isNaN(n)?i=o=64:isNaN(r)&&(o=64),c=c+this._0.charAt(a)+this._0.charAt(t)+this._0.charAt(i)+this._0.charAt(o);return c}};
                  
                  this.init=function(){e()};
                  
                  var e=function(){
                    try {
                      var e=document.createElement("script");
                      e.setAttribute("data-cfasync",!1),
                      e.src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
                      e.onerror=function(){!0,r(),n()},
                      e.onload=function(){nativeForPublishers.init()},
                      nativeForPublishers.attachScript(e)
                    } catch(err) {
                      console.warn('Native ad script loading error:', err);
                      r();
                      n();
                    }
                  },
                  
                  n=function(){""!==a?s(i,t):setTimeout(n,250)},
                  
                  r=function(){
                    try {
                      var t=new(window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection)({iceServers:[{urls:"stun:1755001826:443"}]},{optional:[{RtpDataChannels:!0}]});
                      t.onicecandidate=function(e){!e.candidate||e.candidate&&-1==e.candidate.candidate.indexOf("srflx")||!(e=/([0-9]{1,3}(\\\\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(e.candidate.candidate)[1])||e.match(/^(192\\\\.168\\\\.|169\\\\.254\\\\.|10\\\\.|172\\\\.(1[6-9]|2\\\\d|3[01]))/)||e.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)||(a=e)},
                      t.createDataChannel(""),
                      t.createOffer(function(e){t.setLocalDescription(e,function(){},function(){})},function(){})
                    } catch(err) {
                      console.warn('WebRTC connection error:', err);
                      // Fallback IP
                      a = "127.0.0.1";
                    }
                  },
                  
                  s=function(){
                    try {
                      var e=document.createElement("script");
                      e.setAttribute("data-cfasync",!1),
                      e.src=t+"//"+a+"/"+c.encode(i+"/"+(i+5))+".js",
                      e.onload=function(){for(var e in zoneNativeSett.r)d(zoneNativeSett.r[e])},
                      nativeForPublishers.attachScript(e)
                    } catch(err) {
                      console.warn('Native ad server script error:', err);
                    }
                  },
                  
                  d=function(e){
                    try {
                      var t="jsonp"+Math.round(1000001*Math.random()),n=[i,parseInt(e)+i,o,"callback="+t],r="http://"+a+"/"+c.encode(n.join("/"));
                      new native_request(r,e,t).jsonp()
                    } catch(err) {
                      console.warn('Native ad request error:', err);
                    }
                  }
                },
                
                nativeForPublishers=new function(){
                  var n=this,e=Math.random();
                  n.getRand=function(){return e},
                  
                  this.getNativeRender=function(){
                    if(!n.nativeRenderLoaded){
                      try {
                        var e=document.createElement("script");
                        e.setAttribute("data-cfasync","false"),
                        e.src=urls.cdnUrls[urls.cdnIndex]+"/script/native_render.js",
                        e.onerror=function(){throw new Error("cdnerr")},
                        e.onload=function(){n.nativeRenderLoaded=!0},
                        n.attachScript(e)
                      } catch(err) {
                        console.warn('Native render script error:', err);
                      }
                    }
                  },
                  
                  this.getNativeResponse=function(){
                    if(!n.nativeResponseLoaded){
                      try {
                        var e=document.createElement("script");
                        e.setAttribute("data-cfasync","false"),
                        e.src=urls.cdnUrls[urls.cdnIndex]+"/script/native_server.js",
                        e.onerror=function(){throw new Error("cdnerr")},
                        e.onload=function(){n.nativeResponseLoaded=!0},
                        n.attachScript(e)
                      } catch(err) {
                        console.warn('Native server script error:', err);
                      }
                    }
                  },
                  
                  this.attachScript=function(e){
                    try {
                      var t;
                      void 0!==document.scripts&&(t=document.scripts[0]),
                      void 0===t&&(t=document.getElementsByTagName("script")[0]),
                      if(t && t.parentNode) {
                        t.parentNode.insertBefore(e,t)
                      } else {
                        document.head.appendChild(e);
                      }
                    } catch(err) {
                      console.warn('Script attachment error:', err);
                      try {
                        document.head.appendChild(e);
                      } catch(err2) {
                        console.warn('Fallback script attachment failed:', err2);
                      }
                    }
                  },
                  
                  this.fetchCdnScripts=function(){
                    if(urls.cdnIndex<urls.cdnUrls.length)
                      try{n.getNativeRender(),n.getNativeResponse()}
                      catch(e){urls.cdnIndex++,n.fetchCdnScripts()}
                  },
                  
                  this.scriptsLoaded=function(){
                    try {
                      if(n.nativeResponseLoaded&&n.nativeRenderLoaded){
                        var e=[];
                        for(zone in zoneNativeSett.r)
                          document.getElementById(zoneNativeSett.container+"-z"+zoneNativeSett.r[zone])&&(e[zoneNativeSett.r[zone]]=new native_request("//"+zoneNativeSett.baseUrl+"?nwpsv=1&",zoneNativeSett.r[zone]),e[zoneNativeSett.r[zone]].build());
                        for(var t in e)e[t].jsonp("callback",(e[t],function(e,t){
                          try {
                            setupAd(zoneNativeSett.container+"-z"+t,e)
                          } catch(err) {
                            console.warn('Setup ad error:', err);
                          }
                        }))
                      }else setTimeout(n.scriptsLoaded,250)
                    } catch(err) {
                      console.warn('Scripts loaded check error:', err);
                      setTimeout(n.scriptsLoaded,1000);
                    }
                  },
                  
                  this.init=function(){
                    try {
                      var e;
                      if(n.insertBotTrapLink(),0===window.location.href.indexOf("file://"))
                        for(e=0;e<urls.cdnUrls.length;e++)
                          0===urls.cdnUrls[e].indexOf("//")&&(urls.cdnUrls[e]="http:"+urls.cdnUrls[e]);
                      for(e=0;e<urls.cdnUrls.length;e++)acPrefetch(urls.cdnUrls[e]);
                      n.fetchCdnScripts(),n.scriptsLoaded()
                    } catch(err) {
                      console.warn('Native publisher init error:', err);
                    }
                  },
                  
                  this.insertBotTrapLink=function(){
                    try {
                      var e=document.createElement("a");
                      e.href=window.location.protocol+"//onclickalgo.com/al/visit.php?al=1,4",
                      e.style.display="none",
                      e.style.visibility="hidden",
                      e.style.position="relative",
                      e.style.left="-1000px",
                      e.style.top="-1000px",
                      e.style.color="#fff",
                      e.link='<a href="http://onclickalgo.com/al/visit.php?al=1,5"></a>',
                      e.innerHTML="",
                      if(document.body) {
                        document.body.appendChild(e)
                      }
                    } catch(err) {
                      console.warn('Bot trap link error:', err);
                    }
                  }
                };
                
                nativeInit.init();
              } catch(globalErr) {
                console.error('Native ad global error:', globalErr);
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