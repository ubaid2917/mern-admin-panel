module.exports = {
  success: (res, message, data, code = 200, pagination = null) => {
    const response = {
      success: true,
      message,
    };
    if (data !== undefined && data !== null) {
      response.data = data;
    }
    if (pagination) {
      Object.assign(response, pagination);
    }

    return res.status(code).json(response);
  },

  error: (res, message, errors = [], code = 400) => {
    const response = {
      success: false,
      message,
    };

    if (errors && errors.length > 0) {
      response.errors = errors;
    }

    return res.status(code).json(response);
  },
};
