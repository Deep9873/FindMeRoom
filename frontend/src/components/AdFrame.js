import React, { useEffect, useRef } from "react";

/**
 * AdFrame: sandboxed iframe wrapper for third-party ad scripts.
 * - Isolates vendor DOM mutations and JS errors from the React app
 * - Prevents React dev overlay from being triggered by cross-origin errors
 */
export default function AdFrame({
  width = "100%",
  height = 250,
  className = "",
  title = "ad-sandbox",
  style = {},
  onReady,
}) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Prepare sandboxed iframe document
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    try {
      doc.open();
      doc.write(`<!doctype html><html><head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>html,body{margin:0;padding:0;background:transparent;}</style>
      </head><body></body></html>`);
      doc.close();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("AdFrame: failed to initialize iframe document", e);
      return;
    }

    // Notify parent so it can inject vendor script safely inside the iframe
    try {
      if (typeof onReady === "function") {
        onReady({ iframe, win: iframe.contentWindow, doc });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("AdFrame onReady error", e);
    }

    // Cleanup: clear iframe content
    return () => {
      try {
        const d = iframe.contentDocument || iframe.contentWindow?.document;
        if (d) {
          d.open();
          d.write("<!doctype html><html><body></body></html>");
          d.close();
        }
      } catch (_) {}
    };
  }, [onReady]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={className}
      style={{ 
        border: 0, 
        width, 
        height, 
        overflow: "visible",
        display: "block",
        ...style 
      }}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}