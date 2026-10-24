export interface SubscriptionResult {
  ok: boolean
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

/**
 * Submits an email to the dispatch list.
 *
 * This application ships without a backend, so the function validates the
 * address and returns an honest result instead of pretending to store it.
 * Replace the body of this function with a real API call when a mailing
 * service is connected — callers do not need to change.
 */
export async function subscribeToDispatches(email: string): Promise<SubscriptionResult> {
  const trimmed = email.trim()

  if (!isValidEmail(trimmed)) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  // Backend integration point: POST `trimmed` to your mailing API here.
  return {
    ok: true,
    message:
      'Thanks! Dispatch signup is not connected to a mailing backend yet, so no address was stored.',
  }
}
