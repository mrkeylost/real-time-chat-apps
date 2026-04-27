const handleAsync = (fn, operation = "unknown") => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(`Error in ${operation} handler`, error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  };
};

export default handleAsync;
