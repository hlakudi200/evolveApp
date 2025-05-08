using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.PaymentService.DTO
{
    public class PayFastResponse
    {
        public string PaymentUrl { get; set; }
        public PayFastRequest Request { get; set; }
    }
}
