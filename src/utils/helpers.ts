import QRCode from 'qrcode';

export function capitalizeFirstWords(str) {
  return str
    .split(' ')
    .map((word) => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word;
      }
    })
    .join(' ');
}

export const generateQRCode = async (text) => {
  const qrCodeImage = await QRCode.toDataURL(text);
  return qrCodeImage;
};
