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

// Detect if page was loaded from cache
export const isLoadedFromCache = () => {
  return window.performance && 
         window.performance.navigation && 
         window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD;
};

// Force refresh if loaded from cache
export const handleCacheReload = () => {
  if (isLoadedFromCache()) {
    console.log('Page loaded from cache, forcing refresh...');
    window.location.reload(true);
  }
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