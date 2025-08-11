/**
 * Cache Utilities to handle browser caching issues
 * Prevents state loss and ensures fresh data loading
 */

// Generate cache busting timestamp
export const getCacheBusterParam = () => {
  return `_cb=${Date.now()}`;
};

// Clear browser cache programmatically with enhanced clearing
export const clearBrowserCache = () => {
  console.log("Clearing all browser caches...");
  
  // Clear localStorage
  try {
    localStorage.clear();
  } catch (e) {
    console.warn('Unable to clear localStorage:', e);
  }

  // Clear sessionStorage
  try {
    sessionStorage.clear();
  } catch (e) {
    console.warn('Unable to clear sessionStorage:', e);
  }

  // Clear service worker caches if available
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    }).catch(e => console.warn('Unable to clear cache storage:', e));
  }

  // Unregister service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    }).catch(e => console.warn('Unable to unregister service workers:', e));
  }

  // Force reload without cache
  setTimeout(() => {
    if (window.location.reload) {
      window.location.reload(true);
    } else {
      // Fallback method
      window.location.href = window.location.href + '?cache_bust=' + Date.now();
    }
  }, 500);
};

// Add cache busting to URLs
export const addCacheBuster = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${getCacheBusterParam()}`;
};

// Enhanced local storage with versioning
export const versionedStorage = {
  version: '2.0.0', // Increment version to force cache clear for existing users
  
  setItem: (key, value) => {
    try {
      const versionedValue = {
        version: versionedStorage.version,
        timestamp: Date.now(),
        data: value
      };
      localStorage.setItem(key, JSON.stringify(versionedValue));
    } catch (e) {
      console.warn('Unable to set localStorage item:', e);
    }
  },
  
  getItem: (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return null;

      // Try parse JSON; if it fails, treat as legacy plain string and migrate
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (jsonErr) {
        // Legacy value (e.g., "Agartala, Tripura"). Migrate to versioned format.
        // Safeguard: if raw is a plain string or number, store as-is and return
        versionedStorage.setItem(key, raw);
        return raw;
      }

      // If parsed is a primitive (e.g., string), also migrate
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        versionedStorage.setItem(key, parsed);
        return parsed;
      }
      
      // Parsed is an object but might not be our versioned envelope
      if (!('version' in parsed) || !('timestamp' in parsed) || !('data' in parsed)) {
        // Unknown shape; migrate the value as-is
        versionedStorage.setItem(key, parsed);
        return parsed;
      }

      // Envelope checks
      if (parsed.version !== versionedStorage.version) {
        // Version mismatch – drop and return null
        localStorage.removeItem(key);
        return null;
      }

      const hoursDiff = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
      if (hoursDiff > 24) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (e) {
      // Downgrade to debug to avoid noisy console in production
      console.debug('versionedStorage: unable to parse item, will migrate if possible');
      return null;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Unable to remove localStorage item:', e);
    }
  }
};

// Detect if page was loaded from BFCache using modern API
export const isLoadedFromCache = (event = null) => {
  // Prefer pageshow event persisted flag
  if (event && typeof event.persisted === 'boolean') return event.persisted;
  // Fallback to PerformanceNavigationTiming
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.type) {
      return nav.type === 'back_forward';
    }
  } catch (e) {}
  // Legacy fallback (deprecated in modern browsers)
  return (
    window.performance &&
    window.performance.navigation &&
    window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD
  );
};

// Force refresh if loaded from cache and set up listeners for BFCache restores
export const handleCacheReload = () => {
  const reloadIfNeeded = (e) => {
    if (isLoadedFromCache(e)) {
      console.log('Page restored from cache (BFCache). Forcing hard reload to fetch latest assets.');
      window.location.reload();
    }
  };

  // Run on first load as well
  reloadIfNeeded();
  // Listen for bfcache restores
  window.addEventListener('pageshow', reloadIfNeeded);
};

// Add meta tags to prevent caching
// One-time localStorage sanitizer to migrate legacy keys before React mounts
export const sanitizeLocalStorage = () => {
  try {
    const v = localStorage.getItem('selectedCity');
    if (v && typeof v === 'string') {
      const trimmed = v.trim();
      // If it doesn't look like our envelope JSON, migrate it directly
      if (trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('[')) {
        versionedStorage.setItem('selectedCity', v);
      }
    }
  } catch (e) {
    // noop
  }
};

export const addNoCacheMetaTags = () => {
  const metaTags = [
    { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
    { httpEquiv: 'Pragma', content: 'no-cache' },
    { httpEquiv: 'Expires', content: '0' }
  ];
  
  metaTags.forEach(tag => {
    const existingTag = document.querySelector(`meta[http-equiv="${tag.httpEquiv}"]`);
    if (!existingTag) {
      const metaTag = document.createElement('meta');
      metaTag.httpEquiv = tag.httpEquiv;
      metaTag.content = tag.content;
      document.head.appendChild(metaTag);
    }
  });
};

// Check backend app version and force reload when version changes
export const initCacheControl = (backendUrl) => {
  if (!backendUrl) return;

  // Enhanced version checking with better error handling
  const KEY = 'app_version';
  const fetchVersion = async () => {
    try {
      const base = (backendUrl || '').replace(/\/+$/, '');
      const res = await fetch(`${base}/api/?nocache=${Date.now()}`, { 
        cache: 'no-store', 
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      if (!res.ok) return null;
      
      // Get version from multiple possible sources
      const headerVersion = res.headers.get('X-App-Version') || res.headers.get('x-app-version');
      const etag = res.headers.get('ETag') || res.headers.get('etag');
      
      let bodyVersion = null;
      try {
        const data = await res.clone().json().catch(() => null);
        bodyVersion = data && (data.version || data.X_App_Version);
      } catch (e) {}
      
      return headerVersion || etag || bodyVersion || null;
    } catch (e) {
      console.warn('Cache version check failed:', e);
      return null;
    }
  };

  const checkAndReload = async () => {
    const latest = await fetchVersion();
    if (!latest) return;
    
    const current = localStorage.getItem(KEY);
    if (current && current !== latest) {
      console.log(`🔄 New version detected (${current} → ${latest}). Clearing caches and reloading...`);
      clearBrowserCache();
    } else if (!current) {
      localStorage.setItem(KEY, latest);
    }
  };

  // Run immediately and then every 30s for more frequent checks
  checkAndReload();
  const interval = setInterval(checkAndReload, 30000);
  window.addEventListener('beforeunload', () => clearInterval(interval));
};