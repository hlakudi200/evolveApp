using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.PaymentService.DTO
{
    public class YocoCheckoutResponse
    {
        public string CheckoutUrl { get; set; }
        public string CheckoutId { get; set; }
    }
}
