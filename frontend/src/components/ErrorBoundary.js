import React from "react";

/**
 * Generic Error Boundary to isolate 3rd‑party widgets (e.g., ads) from crashing the app.
 *
 * Usage:
 *  <ErrorBoundary componentName="AdcashBanner">
 *    <AdcashBanner />
 *  </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    try {
      // Non-fatal log: helps diagnose noisy third‑party script issues without breaking the UI
      console.error(
        `[ErrorBoundary] ${this.props.componentName || "Child"} crashed:`,
        error,
        errorInfo
      );
    } catch (_) {}
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback) {
        return typeof fallback === "function" ? fallback(this.state.error) : fallback;
      }
      // Default non-intrusive fallback
      return (
        <div role="alert" className="mx-auto max-w-md p-3 text-xs text-gray-600 bg-gray-50 border rounded">
          Advertisement failed to load. You can continue browsing safely.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;