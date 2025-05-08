using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.PaymentService.DTO
{
    public class YocoCheckoutRequest
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string SuccessUrl { get; set; }
        public string CancelUrl { get; set; }
        public string FailureUrl { get; set; }
    }
}
