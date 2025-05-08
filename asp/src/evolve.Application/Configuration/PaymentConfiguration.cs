using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.Configuration
{
    public class PaymentConfiguration
    {
        public string PayFastMerchantId { get; set; }
        public string PayFastMerchantKey { get; set; }
        public string PayFastPassphrase { get; set; }
        public bool IsPayFastTestMode { get; set; }

        public string YocoSecretKey { get; set; }
        public bool IsYocoTestMode { get; set; }
    }
}
