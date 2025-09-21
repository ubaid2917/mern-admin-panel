const { uploadFile } = require("./aws");

async function handleFileUpload(file, folderName) {
  if (!file) {
    return {
      success: false,
      statusCode: 400,
      message: "File is required.",
    };
  }

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return {
      success: false,
      statusCode: 400,
      message: "File must be jpeg, png, jpg, or svg.",
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      success: false,
      statusCode: 400,
      message: "File size must be less than 5MB.",
    };
  }

  // Generate a new file name
  const timestamp = Date.now();
  const newFileName = `${timestamp}-${file.originalname}`;
  file.filename = newFileName;

  // Upload file
  const fileData = await uploadFile(file, folderName);

  if (!fileData || !fileData.Location) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to upload file.",
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "File uploaded successfully.",
    fileUrl: fileData.Location,
    fileName: newFileName,
  };
}

module.exports = { handleFileUpload };
