import hash from "hash-sum";
import tinycolor from "tinycolor2";

export default function getColorFromString(str) {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject(new Error("No se proporcionó una cadena"));
    }
    const hashValue = hash(str);
    const color = tinycolor(`#${hashValue}`).toHexString();
    resolve(color);
  });
}
