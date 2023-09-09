export const filtersCleaner = (objFilter: any) => {
  const resultObj = { ...objFilter };

  Object.keys(objFilter).forEach((key: string) => {
    if (resultObj[key] === '') {
      delete resultObj[key];
    }
  });

  return resultObj;
};
