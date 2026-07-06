import fs from "fs";

const deleteLocalFile = (filePath) => {
  if (!filePath) return;

  fs.unlink(filePath, (error) => {
    if (error) {
      console.error(`Failed to delete file: ${filePath}`, error.message);
    }
  });
};

export default deleteLocalFile;