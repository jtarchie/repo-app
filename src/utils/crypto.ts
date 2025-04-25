import CryptoJS from "crypto-js";
import pako from "pako";

const DEFAULT_PASSWORD =
  "Why would you want to cheat?... :o It's no fun. :') :'D";

export const decryptES3 = (
  fileData: ArrayBuffer,
  password: string = DEFAULT_PASSWORD,
): Promise<string> => {
  try {
    // Convert ArrayBuffer to WordArray
    const encryptedData = CryptoJS.lib.WordArray.create(
      new Uint8Array(fileData),
    );

    // Extract the IV (first 16 bytes)
    const iv = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(0, 4),
      16,
    );
    const ciphertext = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(4),
      encryptedData.sigBytes - 16,
    );

    // Derive the key using PBKDF2
    const key = CryptoJS.PBKDF2(password, iv, {
      keySize: 16 / 4, // 16 bytes = 128 bits
      iterations: 100,
      hasher: CryptoJS.algo.SHA1,
    });

    // Decrypt using AES-CBC
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      key,
      { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC },
    );

    // Convert to bytes
    const decryptedBytes = new Uint8Array(decrypted.sigBytes);
    for (let i = 0; i < decrypted.sigBytes; i++) {
      decryptedBytes[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) &
        0xff;
    }

    // Check if it's GZip compressed (magic number 0x1f8b)
    if (decryptedBytes[0] === 0x1f && decryptedBytes[1] === 0x8b) {
      // Decompress using pako
      const decompressedData = pako.inflate(decryptedBytes);
      // Convert to string assuming it's UTF-8 encoded JSON
      const textDecoder = new TextDecoder("utf-8");
      return textDecoder.decode(decompressedData);
    } else {
      // Not compressed, just convert to string
      const textDecoder = new TextDecoder("utf-8");
      return textDecoder.decode(decryptedBytes);
    }
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error(`Failed to decrypt file: ${error.message}`);
  }
};

export const encryptES3 = (
  jsonData: string,
  password: string = DEFAULT_PASSWORD,
): Promise<ArrayBuffer> => {
  try {
    // Compress data with GZip
    const textEncoder = new TextEncoder();
    const textBytes = textEncoder.encode(jsonData);
    const compressedData = pako.gzip(textBytes);

    // Generate random IV
    const iv = CryptoJS.lib.WordArray.random(16);

    // Derive key using PBKDF2
    const key = CryptoJS.PBKDF2(password, iv, {
      keySize: 16 / 4, // 16 bytes = 128 bits
      iterations: 100,
      hasher: CryptoJS.algo.SHA1,
    });

    // Create WordArray from compressedData
    const dataWordArray = CryptoJS.lib.WordArray.create(compressedData);

    // Encrypt using AES-CBC
    const encrypted = CryptoJS.AES.encrypt(dataWordArray, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    // Combine IV and ciphertext
    const combinedWordArray = CryptoJS.lib.WordArray.create();
    combinedWordArray.concat(iv);
    combinedWordArray.concat(encrypted.ciphertext);

    // Convert to Uint8Array
    const resultBytes = new Uint8Array(combinedWordArray.sigBytes);
    for (let i = 0; i < combinedWordArray.sigBytes; i++) {
      resultBytes[i] =
        (combinedWordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }

    return resultBytes.buffer;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error(`Failed to encrypt data: ${error.message}`);
  }
};

export const parseJSON = (jsonString: string): object => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw new Error("The decrypted content is not valid JSON");
  }
};

export { DEFAULT_PASSWORD };
