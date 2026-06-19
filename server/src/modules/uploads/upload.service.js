import cloudinary from '../../config/cloudinary.js'

export class UploadService {
  /**
   * Uploads a memory file buffer directly to Cloudinary using upload_stream.
   * Enforces specific upload parameters: secure, overwrite:false, invalidate, limit crop, auto quality/format, and strip_profile.
   */
  static uploadToCloudinary(fileBuffer, folderName) {
    return new Promise((resolve, reject) => {
      const options = {
        folder: folderName,
        secure: true,
        overwrite: false,
        invalidate: true,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        crop: 'limit',
        flags: 'strip_profile'
      }

      const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })

      stream.end(fileBuffer)
    })
  }

  /**
   * Deletes an asset from Cloudinary using its publicId.
   */
  static deleteFromCloudinary(publicId) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
}
