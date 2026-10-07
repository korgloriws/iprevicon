import QRCode from "qrcode";

export async function qrCodeDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 280,
    color: {
      dark: "#09445e",
      light: "#fffbf7",
    },
  });
}
