import { describe, expect, it } from 'vitest'
import { getContactErrorMessage } from './contactErrors'

describe('getContactErrorMessage', () => {
  it('shows a helpful message for 429 rate limit responses', () => {
    const message = getContactErrorMessage({
      response: { status: 429, data: { error: { code: 'TOO_MANY_REQUESTS' } } }
    })

    expect(message).toBe("You've sent too many messages recently. Please try again later.")
  })

  it('shows a validation message for 400 responses', () => {
    expect(getContactErrorMessage({ response: { status: 400 } })).toBe(
      'Please check your details and try again.'
    )
  })

  it('shows a server message for 500 responses', () => {
    expect(getContactErrorMessage({ response: { status: 500 } })).toBe(
      'The server had trouble sending your message. Please try again soon.'
    )
  })

  it('shows a network message when no response is received', () => {
    expect(getContactErrorMessage({ request: {} })).toBe(
      'Network issue detected. Please check your connection and try again.'
    )
  })
})
