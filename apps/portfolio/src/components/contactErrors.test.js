import { describe, expect, it } from 'vitest'
import { getContactErrorMessage } from './contactErrors'

describe('getContactErrorMessage', () => {
  it('shows a helpful message for 429 rate limit responses', () => {
    const message = getContactErrorMessage({
      response: { status: 429, data: { error: { code: 'TOO_MANY_REQUESTS' } } }
    })

    expect(message).toBe("You've sent too many messages recently.")
  })

  it('shows a helpful message for the contact-specific rate limit code', () => {
    const message = getContactErrorMessage({
      response: { status: 429, data: { error: { code: 'CONTACT_LIMIT_REACHED' } } }
    })

    expect(message).toBe("You've sent too many messages recently.")
  })

  it('shows a validation message for 400 responses', () => {
    expect(getContactErrorMessage({ response: { status: 400 } })).toBe(
      'Please fill all required fields.'
    )
  })

  it('shows a server message for 500 responses', () => {
    expect(getContactErrorMessage({ response: { status: 500 } })).toBe(
      'Server error. Please try later.'
    )
  })

  it('shows a network message when no response is received', () => {
    expect(getContactErrorMessage({ request: {} })).toBe(
      'Unable to connect.'
    )
  })
})
