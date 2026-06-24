import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'node:stream';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CL_NAME,
  api_key: process.env.CL_API_KEY,
  api_secret: process.env.CL_SECRET,
});

export const saveFile = buffer => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'hillel/contacts',
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        return resolve(uploadResult);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};
