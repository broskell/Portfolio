export const getContactErrorMessage = (error) => {
  const status = error?.response?.status
  const code = error?.response?.data?.error?.code

  if (status === 429 || code === 'TOO_MANY_REQUESTS') {
    return "You've sent too many messages recently. Please try again later."
  }

  if (status === 400) {
    return 'Please check your details and try again.'
  }

  if (status >= 500) {
    return 'The server had trouble sending your message. Please try again soon.'
  }

  if (error?.request && !error?.response) {
    return 'Network issue detected. Please check your connection and try again.'
  }

  return 'Failed to send. Please try again.'
}
