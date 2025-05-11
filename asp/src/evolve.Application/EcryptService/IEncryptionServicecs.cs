using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Dependency;

namespace evolve.EcryptService
{
    public interface IEncryptionService : ITransientDependency
    {
        string Encrypt(string plainText);
        string Decrypt(string encryptedText);
    }
}
