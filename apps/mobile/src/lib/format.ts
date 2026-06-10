/** Formats integer cents as a compact dollar string: 150000 → "$1,500" */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Splits cents into whole and decimal parts for large-number displays.
 * 1500000 → { whole: '$15,000', decimal: '.00' }
 */
export function formatCentsSplit(cents: number): { whole: string; decimal: string } {
  const dollars = Math.floor(cents / 100);
  const remainder = cents % 100;
  const whole = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
  const decimal = `.${remainder.toString().padStart(2, '0')}`;
  return { whole, decimal };
}

/** Formats an ISO date string as "Jan 5, 2025" */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateStr));
}

/** Formats an ISO date string as "Jan 2025" */
export function formatMonthYear(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}
