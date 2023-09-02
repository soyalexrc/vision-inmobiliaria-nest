import * as unzipper from 'unzipper';
import * as fs from 'fs';

//function to extract ZIP file
export const extractZip = async (path: string, outputPath: string) => {
  await fs
    .createReadStream(path)
    .pipe(unzipper.Extract({ path: outputPath }))
    .promise();
};
