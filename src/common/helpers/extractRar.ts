import { createExtractorFromFile } from 'node-unrar-js';

export async function extractRar(path: string, outputPath: string) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: path,
      targetPath: outputPath,
    });

    // Extract the files
    [...extractor.extract().files];
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
  }
}
