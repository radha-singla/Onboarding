module.exports = (req, res, next) => {
  res.success = (data) => {
    res.status(200).json({
      data,
    });
  };
  res.badRequest = (message, error) => {
    res.status(400).json({
      message,
      error,
    });
  };
  res.failture = (message, error) => {
    res.status(500).json({
      message,
      error,
    });
  };
  res.validationField = (message, error) => {
    res.status(401).json({
      message,
      error,
    });
  };
  res.unAuthorized = (message, error) => {
    res.status(401).json({
      message,
      error,
    });
  };
  next();
};
