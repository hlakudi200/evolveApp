using System;
using System.IO;
using System.Threading.Tasks;
using evolve.Configurations;
using evolve.Services.EmailService.DTO;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace evolve.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
            Console.WriteLine("Loaded SMTP Settings:");
            Console.WriteLine($"Server: {_smtpSettings.Server}");
            Console.WriteLine($"Port: {_smtpSettings.Port}");
            Console.WriteLine($"Username: {_smtpSettings.Username}");
            Console.WriteLine($"From: {_smtpSettings.FromName} <{_smtpSettings.FromAddress}>");

        }

        public async Task SendEmailAsync(EmailRequestDto request)
        {
            var email = new MimeMessage();


            email.From.Add(new MailboxAddress(_smtpSettings.FromName, _smtpSettings.FromAddress));
            email.To.Add(MailboxAddress.Parse(request.To));


            if (!string.IsNullOrEmpty(request.Cc))
            {
                foreach (var cc in request.Cc.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    email.Cc.Add(MailboxAddress.Parse(cc.Trim()));
                }
            }


            if (!string.IsNullOrEmpty(request.Bcc))
            {
                foreach (var bcc in request.Bcc.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    email.Bcc.Add(MailboxAddress.Parse(bcc.Trim()));
                }
            }


            email.Subject = request.Subject;


            var bodyBuilder = new BodyBuilder();


            if (request.IsBodyHtml)
            {
                bodyBuilder.HtmlBody = request.Body;
            }
            else
            {
                bodyBuilder.TextBody = request.Body;
            }


            if (request.Attachments != null && request.Attachments.Count > 0)
            {
                foreach (var attachment in request.Attachments)
                {
                    if (attachment.FileBytes != null && attachment.FileBytes.Length > 0)
                    {

                        var stream = new MemoryStream(attachment.FileBytes);


                        bodyBuilder.Attachments.Add(attachment.FileName, stream, ContentType.Parse(attachment.ContentType));


                    }
                }
            }


            email.Body = bodyBuilder.ToMessageBody();


            Console.WriteLine($"Sending email to {request.To} with subject: {request.Subject}");
            Console.WriteLine($"Attachments count: {(request.Attachments?.Count ?? 0)}");

            try
            {

                using var client = new SmtpClient();

                await client.ConnectAsync(
                    _smtpSettings.Server,
                    _smtpSettings.Port,
                    SecureSocketOptions.StartTls
                );


                await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
                await client.SendAsync(email);
                await client.DisconnectAsync(true);

                Console.WriteLine("Email sent successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
        }
    }
}
