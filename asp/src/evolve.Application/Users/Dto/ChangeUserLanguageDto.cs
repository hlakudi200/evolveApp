using System.ComponentModel.DataAnnotations;

namespace evolve.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}