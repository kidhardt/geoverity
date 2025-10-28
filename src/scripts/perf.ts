/**
 * Performance Monitoring - CLS Tracking
 * Building-pages v2.0.0 compliant
 * Target: CLS < 0.1 for 75% of visits
 */

interface CLSEntry {
  value: number;
  sources?: Array<{ node?: Node }>;
}

// Track CLS score
let clsValue = 0;

// Observer for layout shifts
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries() as PerformanceEntry[]) {
    const clsEntry = entry as unknown as CLSEntry;
    if (!(entry as any).hadRecentInput) {
      clsValue += clsEntry.value;
    }
  }
});

// Start observing
if ('PerformanceObserver' in window) {
  try {
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // layout-shift not supported
  }
}

// Report CLS on page unload (debug only)
if (import.meta.env.DEV) {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      console.log(`[CLS] ${clsValue.toFixed(4)} (target < 0.1)`);
    }
  });
}

export { clsValue };
