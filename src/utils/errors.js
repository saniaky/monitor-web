export const getErrorMsg = (response, defaultValue = 'We have technical difficulties.') => {
  let errorMessage = ''

  if (response instanceof Object && response.error) {
    for (const [field, errors] of Object.entries(response.error)) {
      errorMessage += `${field} - ${errors.join(', ')}\n`
    }
  } else {
    errorMessage = defaultValue
  }

  return errorMessage
}
