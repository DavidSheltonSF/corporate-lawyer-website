import { useEffect, useState } from 'react';

export function useElementFullyVisible(element: any, options?: IntersectionObserverInit) {
  const [elementIsFullyVisible, setElementIsFullyVisible] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setElementIsFullyVisible(entry.isIntersecting);
      },
      { ...options }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return { elementIsFullyVisible };
}
