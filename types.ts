@import url('https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@300;400;700;900&family=Noto+Sans+Khmer:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Battambang", "Noto Sans Khmer", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-muol: "Moul", "Khmer OS Muol Light", serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Printing styling */
@media print {
  @page {
    size: A4 portrait;
    margin: 10mm !important;
  }
  html, body {
    height: auto !important;
    overflow: visible !important;
    background-color: #ffffff !important;
  }
  .print-no-scroll {
    max-height: none !important;
    overflow: visible !important;
    display: grid !important;
  }
  .print-card {
    border: none !important;
    box-shadow: none !important;
    padding: 0mm !important;
    margin: 0mm !important;
    width: 100% !important;
    max-width: 100% !important;
    min-height: 277mm !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    box-sizing: border-box !important;
    page-break-after: always !important;
    break-after: page !important;
  }
  header, nav, footer, .no-print, button, select, .print-hidden, .no-print-element {
    display: none !important;
  }
  main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
  }
  .print-avoid-break {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  .grid {
    display: grid !important;
  }
  .print-grid-cols-5 {
    display: grid !important;
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  .print-grid-cols-2 {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
  }
  .border, .border-b, .border-slate-300, .border-slate-950 {
    border-color: #000000 !important;
  }
  .bulk-print-page {
    page-break-after: always !important;
    break-after: page !important;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
