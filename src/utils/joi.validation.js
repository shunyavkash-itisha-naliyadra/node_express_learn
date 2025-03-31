export const validateRequest = schema => {
  console.log('schema', schema);

  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    console.log('error', error);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(err => ({
          field: err.path.join('.'),
          message: err.message.replace(/["]/g, '')
        }))
      });
    }
    next();
  };
};
