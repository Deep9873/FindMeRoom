/*
  Dev-only filters to prevent React dev overlay from halting the UI due to
  cross-origin third‑party script errors (generic "Script error.").
  This does NOT hide genuine app errors and is not included in production.
*/

const KNOWN_THIRDPARTY_PATTERNS = [
  /google-analytics\.com/i,
  /googletagmanager\.com/i,
  /gstatic\.com/i,
  /recaptcha/i,
  /adtrafficquality\.google/i,
  /highperformanceformat\.com/i,
  /profitableratecpm\.com/i,
  /gatekeeperconsent\.com/i,
  /the\.gatekeeperconsent\.com/i,
];

function isThirdPartyUrl(url) {
  if (!url) return true; // most cross-origin script errors have empty filename
  return KNOWN_THIRDPARTY_PATTERNS.some((re) => re.test(url));
}

export function installThirdPartyErrorFilters() {
  // Only in development
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') return;

  // window.error
  window.addEventListener(
    'error',
    (event) => {
      try {
        const msg = (event && event.message) || '';
        const file = (event && event.filename) || '';
        const isGenericScriptError = typeof msg === 'string' && msg.toLowerCase().includes('script error');
        const is3p = isThirdPartyUrl(file) || (event && event.lineno === 0 && event.colno === 0);
        if (isGenericScriptError && is3p) {
          // Suppress the overlay for cross-origin vendor errors
          event.preventDefault();
          // Keep a breadcrumb in console for dev visibility
          // eslint-disable-next-line no-console
          console.warn('[dev-only] Suppressed 3P script error from:', file || 'unknown');
          return false;
        }
      } catch (_) {}
      return undefined;
    },
    true
  );

  // window.unhandledrejection
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      try {
        const reason = event && event.reason;
        const msg = typeof reason === 'string' ? reason : reason && (reason.message || reason.toString());
        // Some 3P libs throw strings
        const isGenericScriptError = typeof msg === 'string' && msg.toLowerCase().includes('script error');
        // Attempt to infer a 3P origin if present
        const stack = reason && reason.stack;
        const origin = typeof stack === 'string' ? stack : '';
        const is3p = isThirdPartyUrl(origin);
        if (isGenericScriptError && is3p) {
          event.preventDefault();
          // eslint-disable-next-line no-console
          console.warn('[dev-only] Suppressed 3P unhandled rejection:', msg);
          return false;
        }
      } catch (_) {}
      return undefined;
    },
    true
  );
}