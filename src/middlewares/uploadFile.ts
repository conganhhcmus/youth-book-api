import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from '@/config';
import { rejects } from 'assert';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';

export const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
    },
});

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
});

export const cloudinaryUpload = async (file: Express.Multer.File) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

export const cloudinaryRemove = async (file: any) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(file, (err: any, res: any) => {
            if (err) {
                return rejects(err);
            }
            return resolve(res);
        });
    });
};
