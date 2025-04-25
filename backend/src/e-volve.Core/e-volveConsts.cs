using e-volve.Debugging;

namespace e-volve;

public class e-volveConsts
{
    public const string LocalizationSourceName = "e-volve";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "af9394a961844ec1a79998617482f227";
}
