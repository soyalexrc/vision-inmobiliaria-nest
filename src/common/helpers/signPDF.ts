import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';

export async function signPDF(inputPath: string, outputPath: string, signatureImage: string) {
  // Read the PDF document
  const pdfBytes = fs.readFileSync(inputPath);

  // Load the document
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const decodedBufferedSignature = Buffer.from(signatureImage, 'base64');

  console.log(pdfDoc);
  console.log(decodedBufferedSignature);

  const pngSignature = await pdfDoc.embedPng(signatureImage);

  // Get the width/height of the PNG image scaled down to 50% of its original size
  const signatureDimensions = pngSignature.scale(0.7);

  // Embed the signature font
  // const signatureFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];

  // Draw the PNG image near the lower right corner of the JPG image
  firstPage.drawImage(pngSignature, {
    x: firstPage.getWidth() / 1.5 - signatureDimensions.width / 2 + 75,
    y: firstPage.getHeight() / 6 - signatureDimensions.height,
    width: signatureDimensions.width,
    height: signatureDimensions.height,
  });

  // Draw the PNG image near the lower right corner of the JPG image
  lastPage.drawImage(pngSignature, {
    x: lastPage.getWidth() / 1.5 - signatureDimensions.width / 2 + 75,
    y: lastPage.getHeight() / 6 - signatureDimensions.height,
    width: signatureDimensions.width,
    height: signatureDimensions.height,
  });

  // // Add the signature text as an overlay
  // firstPage.drawText(signatureText, {
  //   x: 50,
  //   y: 50,
  //   size: 12,
  //   // font: signatureFont,
  //   color: rgb(0, 0, 0),
  // });

  // Save the modified PDF to a file
  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);

  console.log('PDF signed successfully!');
}
