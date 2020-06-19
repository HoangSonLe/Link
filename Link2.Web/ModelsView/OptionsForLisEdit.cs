using Link2.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class OptionsForLisEdit
    {
        public List<BaudRate> BaudRate { get; set; }
        public List<Handshake> Handshake { get; set; }
        public List<LisCommunationMode> LisCommunationMode { get; set; }
        public List<Parity> Parity { get; set; }
        public List<StopBits> StopBits { get; set; }
        public List<TimeZones> TimeZones { get; set; }
    }
}