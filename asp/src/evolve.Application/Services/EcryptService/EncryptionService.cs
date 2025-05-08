using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using evolve.Configurations;
using Microsoft.Extensions.Options;

namespace evolve.Services.EcryptService
{
    public class EncryptionService : IEncryptionService
    {
        private readonly string _encryptionKey;

        public EncryptionService(IOptions<EncryptionSettings> settings)
        {
            _encryptionKey = settings.Value.EncryptionKey;
        }

        public string Encrypt(string plainText)
        {
            // Implementation of AES encryption
            // This is a simplified example - in production use a more robust implementation
            // This is a simplified example - in production use a more robust implementation
            try
            {
                using var aes = Aes.Create();
                aes.Key = Encoding.UTF8.GetBytes(_encryptionKey);
                aes.GenerateIV();

                using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
                using var ms = new System.IO.MemoryStream();

                // Write the IV to the beginning of the stream
                ms.Write(aes.IV, 0, aes.IV.Length);

                using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                using (var sw = new System.IO.StreamWriter(cs))
                {
                    sw.Write(plainText);
                }

                return Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception ex)
            {
                throw new Exception("Error encrypting data", ex);
            }
        }

        public string Decrypt(string encryptedText)
        {
            // Implementation of AES decryption
            // This is a simplified example - in production use a more robust implementation
            try
            {
                var cipherBytes = Convert.FromBase64String(encryptedText);

                using var aes = Aes.Create();
                aes.Key = Encoding.UTF8.GetBytes(_encryptionKey);

                // Get the IV from the beginning of the ciphertext
                var iv = new byte[aes.BlockSize / 8];
                Array.Copy(cipherBytes, 0, iv, 0, iv.Length);
                aes.IV = iv;

                using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                using var ms = new System.IO.MemoryStream(cipherBytes, iv.Length, cipherBytes.Length - iv.Length);
                using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
                using var sr = new System.IO.StreamReader(cs);

                return sr.ReadToEnd();
            }
            catch (Exception ex)
            {
                throw new Exception("Error decrypting data", ex);
            }
        }
    }
}
