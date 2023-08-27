export const fileImageFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'png', 'jpeg', 'webp'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(
    new Error(`Ingrese una imagen con un formato valido (jpg, png, jpeg, webp). Formato ingresado "${fileExtension}" No valido.`),
    false,
  );
};

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);
  callback(null, false);
};
