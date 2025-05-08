using System.Threading.Tasks;
using evolve.Services.EmailService.DTO;

namespace evolve.Services.EmailService
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailRequestDto request);
    }
}
