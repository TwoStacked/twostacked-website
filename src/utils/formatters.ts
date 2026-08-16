/**
 * Formats large numerical values cleanly for UI presentation.
 * Examples: 450 -> "450", 12500 -> "12.5K", 1200000 -> "1.2M", 89400000 -> "89.4M"
 */
export function formatCompactNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === '') return '0';
  const val = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(val)) return '0';

  if (val < 1000) {
    return val.toString();
  }

  if (val < 1_000_000) {
    const k = val / 1000;
    // If it's a clean integer like 12.0K, show 12K, else up to 1 decimal place like 12.5K
    return (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)).replace(/\.0$/, '') + 'K';
  }

  if (val < 1_000_000_000) {
    const m = val / 1_000_000;
    return (m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)).replace(/\.0$/, '') + 'M';
  }

  const b = val / 1_000_000_000;
  return (b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)).replace(/\.0$/, '') + 'B';
}

/**
 * Formats standard comma-separated full number.
 */
export function formatFullNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '0';
  const val = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(val)) return '0';
  return new Intl.NumberFormat('en-US').format(val);
}

/**
 * Formats published date to relative human-readable string (e.g. "2 days ago", "1 week ago", "3 months ago")
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  } catch {
    return '';
  }
}
