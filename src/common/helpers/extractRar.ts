import { createExtractorFromFile } from 'node-unrar-js';
import * as fs from 'fs';

export async function extractRar(path: string, outputPath: string) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: path,
      targetPath: outputPath,
    });

    // Extract the files
    [...extractor.extract().files];

    fs.rmSync(path);
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
  }
}
