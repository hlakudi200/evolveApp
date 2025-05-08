using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using evolve.PaymentService.DTO;
using evolve.Services.PaymentManagement.PaymentAppService.DTO;

namespace evolve.Services.PaymentManagement.PaymentAppService
{
    public interface IPaymentAppService : IAsyncCrudAppService<PaymentDto, Guid>
    {
        Task<PayFastResponse> CreatePayFastPaymentAsync(PayFastRequest input, Guid driverId);
        Task<YocoCheckoutResponse> CreateYocoCheckoutAsync(YocoCheckoutRequest input, Guid driverId);
    }
}
