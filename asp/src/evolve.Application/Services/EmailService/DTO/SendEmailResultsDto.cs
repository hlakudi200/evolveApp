using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.Services.EmailService.DTO
{
    public class SendEmailResultsDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string SentTo { get; set; }
        public DateTime? SentDate { get; set; }
        public int? AttachmentSize { get; set; }
        public string AttachmentName { get; set; }
    }
}
