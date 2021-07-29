exports.errorResponse = msg => {
  return {
    code: -1,
    msg
  }
}

exports.successResponse = (res = {}) => {
  return {
    code: 0,
    res
  }
}
