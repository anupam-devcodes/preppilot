import ApiError from "../utils/ApiError.js";
import deleteLocalFile from "../utils/deleteLocalFile.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      if (req.file?.path) {
        deleteLocalFile(req.file.path);
      }

      const errors = result.error.issues.map((issue) => issue.message);

      return next(new ApiError(400, errors[0], errors));
    }

    req.body = result.data;
    next();
  };
};

export default validate;