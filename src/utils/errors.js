export const getErrorMsg = (response, defaultValue = 'We have technical difficulties.') => {
  let errorMessage = ''

  if (response instanceof Object && response.error instanceof Array) {
    for (const [field, errors] of Object.entries(response.error)) {
      errorMessage += `${field} - ${errors.join(', ')}\n`
    }
  } else if (response.error) {
    errorMessage = JSON.stringify(response.error)
  } else {
    errorMessage = defaultValue
  }

  return errorMessage
}
