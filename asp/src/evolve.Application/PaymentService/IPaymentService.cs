using System;
using System.Threading.Tasks;
using evolve.PaymentService.DTO;

namespace evolve.PaymentService
{
    public interface IPaymentService
    {
        Task<PayFastResponse> CreatePayFastPaymentAsync(PayFastRequest request);
        Task<YocoCheckoutResponse> CreateYocoCheckoutAsync(YocoCheckoutRequest request, Guid referenceId);
        Guid GenerateReferenceId();
    }
}
