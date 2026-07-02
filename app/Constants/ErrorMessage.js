const ErrorCodeMessageMap = {}

const errorMessage = (code = '') => {
  const message = ErrorCodeMessageMap[code] || 'Something went wrong'
  return message
}

export default errorMessage
