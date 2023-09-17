export const filtersCleaner = (objFilter: any) => {
  const resultObj = { ...objFilter };

  Object.keys(objFilter).forEach((key: string) => {
    if (resultObj[key] === '' || resultObj[key] === null || resultObj[key] === 'null') {
      delete resultObj[key];
    }
  });

  return resultObj;
};
