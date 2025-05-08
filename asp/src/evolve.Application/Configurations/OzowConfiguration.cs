using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace evolve.Configurations
{
    public class OzowConfiguration
    {
        public string SiteCode { get; set; }
        public string PrivateKey { get; set; }
        public string ApiKey { get; set; }
        public string ApiBaseUrl { get; set; }
        public bool IsTestMode { get; set; }
    }
}
