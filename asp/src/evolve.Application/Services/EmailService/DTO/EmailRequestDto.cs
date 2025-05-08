using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace evolve.Services.EmailService.DTO
{
    public class EmailRequestDto
    {
        public string To { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsBodyHtml { get; set; } = true;
        public List<EmailAttachmentDto> Attachments { get; set; } = new List<EmailAttachmentDto>();
    }
}
