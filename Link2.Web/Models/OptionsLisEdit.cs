using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class OptionsLisEdit
    {
        public List<BaudRate> BaudRate { get; set; }
        public List<Handshake> Handshake { get; set; }
        public List<LisCommunationMode> LisCommunationMode { get; set; }
        public List<Parity> Parity { get; set; }
        public List<StopBits> StopBits { get; set; }
        public List<TimeZone> TimeZones { get; set; }
    }
}