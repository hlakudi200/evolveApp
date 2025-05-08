namespace evolve.Services.EmailService.DTO
{
    public class EmailAttachmentDto
    {
        public string FileName { get; set; }
        public byte[] FileBytes { get; set; }
        public string ContentType { get; set; }
    }
}
