using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace evolve.PaymentService.DTO
{
    public class PayFastRequest
    {
        public decimal Amount { get; set; }
        public string ItemName { get; set; }
        public string ReturnUrl { get; set; }
        public string CancelUrl { get; set; }
        public string NotifyUrl { get; set; }

        [JsonIgnore]
        public string Signature { get; set; }
    }
}
