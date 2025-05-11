using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.PassengerManagement;
using evolve.PaymentService;
using evolve.PaymentService.DTO;
using evolve.Services.PaymentManagement.PaymentAppService.DTO;

namespace evolve.Services.PaymentManagement.PaymentAppService
{
    public class PaymentAppService : AsyncCrudAppService<Payment, PaymentDto, Guid>, IPaymentAppService
    {
        private readonly IPaymentService _paymentService;

        public PaymentAppService(IRepository<Payment, Guid> repository, IPaymentService paymentService) : base(repository)
        {
            _paymentService = paymentService;
        }


        public async Task<PayFastResponse> CreatePayFastPaymentAsync(PayFastRequest input, Guid driverId)
        {
            try
            {
                var response = await _paymentService.CreatePayFastPaymentAsync(input);

                var payment = new Payment
                {
                    Id = Guid.NewGuid(),
                    DriverId = driverId,
                    Amount = input.Amount,
                    PaymentDate = DateTime.UtcNow,
                    TransactionReference = response.Request?.ReturnUrl ?? Guid.NewGuid().ToString(),
                    GatewayResponseCode = "200",
                    GatewayTransactionId = response.Request?.NotifyUrl,
                    Status = "Initiated"
                };

                await Repository.InsertAsync(payment);

                return response;
            }
            catch (Exception ex)
            {
                Logger.Error("Error in CreatePayFastPaymentAsync", ex);
                throw; // optionally return a user-friendly error instead
            }

        }


        public async Task<YocoCheckoutResponse> CreateYocoCheckoutAsync(YocoCheckoutRequest input, Guid driverId)
        {
            var referenceId = _paymentService.GenerateReferenceId();
            var response = await _paymentService.CreateYocoCheckoutAsync(input, referenceId);

            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                DriverId = driverId,
                Amount = input.Amount,
                PaymentDate = DateTime.UtcNow,
                TransactionReference = referenceId.ToString(),
                GatewayResponseCode = "200",
                GatewayTransactionId = response.CheckoutId,
                Status = "success"
            };

            await Repository.InsertAsync(payment);

            return response;
        }

    }
}