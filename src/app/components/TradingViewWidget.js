'use client'
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ pair }) {
  const container = useRef();

  useEffect(() => {
    const containerElement = container.current;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: pair,
      interval: "5",
      timezone: "Asia/Bangkok",
      theme: "dark",
      style: "1",
      locale: "th_TH",
      hide_top_toolbar: true,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com"
    });

    if (containerElement) {
      containerElement.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (containerElement && script.parentNode) {
        containerElement.removeChild(script);
      }
    };
  }, [pair]);

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);
