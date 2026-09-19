"use client";

import { useEffect } from "react";

function removeNetlifyHud() {
  const selectors = [
    'script[src*="netlify/scripts/hud"]',
    "script[data-netlify-site-id]",
    'iframe[src*="netlify"]',
    'meta[name="netlify-deploy"]',
    'meta[name="hosting-provider"]',
  ];

  for (const selector of selectors) {
    document.querySelectorAll(selector).forEach((node) => node.remove());
  }
}

export function HideNetlifyBranding() {
  useEffect(() => {
    removeNetlifyHud();

    const observer = new MutationObserver(removeNetlifyHud);
    const root = document.documentElement.parentNode ?? document.documentElement;

    observer.observe(root, {
      childList: true,
      subtree: true,
    });

    const interval = window.setInterval(removeNetlifyHud, 500);
    window.setTimeout(() => window.clearInterval(interval), 5000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
