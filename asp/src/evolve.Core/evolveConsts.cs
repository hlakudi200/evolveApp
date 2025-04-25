using evolve.Debugging;

namespace evolve;

public class evolveConsts
{
    public const string LocalizationSourceName = "evolve";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "f6cd51b80ea64a40ab1bc2c8175e6e18";
}
