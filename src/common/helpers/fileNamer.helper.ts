import { v4 as uuid } from 'uuid';

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);

  // @ts-ignore
  file.originalname = file.originalname.replaceAll(' ', '-');

  const fileExtension = file.originalname.split('.').pop();

  const fileName = `${file.originalname.split('.')[0]}-${uuid()}.${fileExtension}`;

  callback(null, fileName);
};

export const imageNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);

  // const fileExtension = file.mimetype.split('/')[1];

  // const fileName = `${uuid()}.${fileExtension}`;
  const fileName = `${file.originalname}-${uuid()}.webp`;

  callback(null, fileName);
};
