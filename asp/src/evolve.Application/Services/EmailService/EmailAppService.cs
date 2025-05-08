using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.UI;
using evolve.Services.EmailService.DTO;

namespace evolve.Services.EmailService
{
    public class EmailAppService : ApplicationService
    {
        private readonly IEmailService _emailService;

        public EmailAppService(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task SendEmail(EmailRequestDto request)
        {
            try
            {

                if (string.IsNullOrEmpty(request.To))
                    throw new UserFriendlyException("Recipient email address is required");

                if (string.IsNullOrEmpty(request.Subject))
                    throw new UserFriendlyException("Email subject is required");

                if (string.IsNullOrEmpty(request.Body))
                    throw new UserFriendlyException("Email body is required");

                if (request.Attachments != null && request.Attachments.Count > 0)
                {
                    Logger.Info($"Sending email with {request.Attachments.Count} attachment(s) to: {request.To}");
                }


                await _emailService.SendEmailAsync(request);

                Logger.Info($"Email sent successfully to: {request.To}");
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send email: {ex.Message}", ex);
                throw new UserFriendlyException($"Failed to send email: {ex.Message}");
            }
        }
    }
}

