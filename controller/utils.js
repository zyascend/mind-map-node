exports.errorResponse = msg => {
  return {
    code: -1,
    msg
  }
}

exports.successResponse = (data = {}) => {
  return {
    code: 0,
    data
  }
}
