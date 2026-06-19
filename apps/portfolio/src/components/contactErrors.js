export const getContactErrorMessage = (error) => {
  const status = error?.response?.status
  const code = error?.response?.data?.error?.code

  if (status === 429 || code === 'TOO_MANY_REQUESTS' || code === 'CONTACT_LIMIT_REACHED') {
    return "You've sent too many messages recently."
  }

  if (status === 400) {
    return 'Please fill all required fields.'
  }

  if (status >= 500) {
    return 'Server error. Please try later.'
  }

  if (error?.request && !error?.response) {
    return 'Unable to connect.'
  }

  return 'Failed to send. Please try again.'
}
