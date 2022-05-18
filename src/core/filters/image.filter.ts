import { ValidationException } from '../exceptions/validation.exception';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new ValidationException([
        {
          property: 'file',
          value: true,
          constraints: { mimeType: 'Only images are allowed(png, jpg, jpeg)' },
        },
      ]),
      false,
    );
  }
  callback(null, true);
};
