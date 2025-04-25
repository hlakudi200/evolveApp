using System.ComponentModel.DataAnnotations;

namespace e-volve.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}