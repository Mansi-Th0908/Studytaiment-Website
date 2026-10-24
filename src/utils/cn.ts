/**
 * Minimal class-name joiner for conditional utility classes.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
