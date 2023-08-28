import { v4 as uuid } from 'uuid';

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);

  const fileExtension = file.originalname.split('.').pop();

  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};

export const imageNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);

  // const fileExtension = file.mimetype.split('/')[1];

  // const fileName = `${uuid()}.${fileExtension}`;
  const fileName = `${uuid()}.webp`;

  callback(null, fileName);
};
