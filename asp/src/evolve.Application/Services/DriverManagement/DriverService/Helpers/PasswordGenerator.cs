using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.Services.DriverManagement.DriverService.Helpers
{
    public static class PasswordGenerator
    {
        private static readonly string Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static readonly string Lowercase = "abcdefghijklmnopqrstuvwxyz";
        private static readonly string Digits = "0123456789";
        private static readonly string Specials = "!@#$%^&*()-_=+[]{}|;:,.<>?";

        public static string GeneratePassword(int length = 10)
        {
            if (length < 3)
                throw new ArgumentException("Password length must be at least 3 to include all required character types.");

            var random = new Random();

            // Ensure each required character type is included
            var required = new[]
            {
            Uppercase[random.Next(Uppercase.Length)],
            Lowercase[random.Next(Lowercase.Length)],
            Specials[random.Next(Specials.Length)]
        };

            // Fill the rest with random characters from all categories
            var allChars = Uppercase + Lowercase + Digits + Specials;
            var remainingChars = Enumerable.Range(0, length - required.Length)
                .Select(_ => allChars[random.Next(allChars.Length)]);

            // Combine and shuffle
            var password = required.Concat(remainingChars)
                                   .OrderBy(_ => random.Next()) // shuffle
                                   .ToArray();

            return new string(password);
        }
    }
}
