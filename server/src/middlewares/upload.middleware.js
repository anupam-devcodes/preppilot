import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

const createStorage = (folderName, filePrefix) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = path.extname(file.originalname);

      cb(null, `${filePrefix}-${uniqueSuffix}${extension}`);
    },
  });
};

const avatarFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(400, "Only JPG, JPEG, PNG, and WEBP images are allowed"),
      false
    );
  }

  cb(null, true);
};

const resumeFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(400, "Only PDF, DOC, and DOCX resume files are allowed"),
      false
    );
  }

  cb(null, true);
};

export const uploadAvatar = multer({
  storage: createStorage("avatars", "avatar"),
  fileFilter: avatarFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export const uploadResume = multer({
  storage: createStorage("resumes", "resume"),
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});