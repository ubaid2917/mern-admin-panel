const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ Upload file
const uploadFile = async (file, dir) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${dir}/${file.filename}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return {
      Location: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
      Key: params.Key,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// ✅ Get file (read as string)
const getFile = async (fileName, dir = "chat-media") => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${dir}/${fileName}`,
  };

  try {
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    // Stream → string
    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString()));
      });

    return await streamToString(response.Body);
  } catch (error) {
    console.error("Error getting file:", error);
    throw error;
  }
};

module.exports = { uploadFile, getFile };
