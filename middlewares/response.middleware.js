const responseMiddleware = (req, res, next) => {
  if (res.err) {
    return res.status(res.err.status || 400).json({
      error: true,
      message: res.err.message
    });
  } else if (res.data) {
    return res.status(200).json(res.data);
  }
  next();
};

export { responseMiddleware };
