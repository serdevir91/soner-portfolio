import { createElement } from 'react';
import { buildCv, cvFileName } from './model';

// Builds the PDF in the browser from the current data and downloads it.
// The PDF library is loaded only when someone asks for a CV.
export async function makeCvBlob(data, lang) {
  const [{ pdf }, { default: CvPdf }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./CvPdf'),
  ]);
  const cv = buildCv(data, lang);
  const element = createElement(CvPdf, { cv, author: data.profile?.name || '' });
  return pdf(element).toBlob();
}

export async function downloadCv(data, lang) {
  const blob = await makeCvBlob(data, lang);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = cvFileName(data, lang);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
