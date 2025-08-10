/**
 * Cache Utilities to handle browser caching issues
 * Prevents state loss and ensures fresh data loading
 */

// Generate cache busting timestamp
export const getCacheBusterParam = () => {
  return `_cb=${Date.now()}`;
};

// Clear browser cache programmatically
export const clearBrowserCache = () => {
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

  // Force reload without cache
  if (window.location.reload) {
    window.location.reload(true);
  }
};

// Add cache busting to URLs
export const addCacheBuster = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${getCacheBusterParam()}`;
};

// Enhanced local storage with versioning
export const versionedStorage = {
  version: '1.0.0',
  
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
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      
      // Check version compatibility
      if (parsed.version !== versionedStorage.version) {
        localStorage.removeItem(key);
        return null;
      }
      
      // Check if data is older than 24 hours
      const hoursDiff = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
      if (hoursDiff > 24) {
        localStorage.removeItem(key);
        return null;
      }
      
      return parsed.data;
    } catch (e) {
      console.warn('Unable to get localStorage item:', e);
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

  const KEY = 'app_version';
  const fetchVersion = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/`, { cache: 'no-store', method: 'GET' });
      // Prefer header, fallback to JSON body property
      const headerVersion = res.headers.get('X-App-Version');
      let bodyVersion = null;
      try {
        const data = await res.clone().json().catch(() => null);
        bodyVersion = data && (data.version || data.X_App_Version || data.message);
      } catch (e) {}
      return headerVersion || bodyVersion || null;
    } catch (e) {
      return null;
    }
  };

  const checkAndReload = async () => {
    const latest = await fetchVersion();
    if (!latest) return;
    const current = localStorage.getItem(KEY);
    if (current && current !== latest) {
      console.log(`Detected new app version (${current} -> ${latest}). Clearing caches and reloading...`);
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      localStorage.setItem(KEY, latest);
      window.location.reload();
    } else if (!current && latest) {
      localStorage.setItem(KEY, latest);
    }
  };

  // Run immediately and then every 60s for the session
  checkAndReload();
  const interval = setInterval(checkAndReload, 60000);
  window.addEventListener('beforeunload', () => clearInterval(interval));
};