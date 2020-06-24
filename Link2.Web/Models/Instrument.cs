using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class Instrument
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AstmFolder { get; set; }
        public bool AutoSendToHost { get; set; }
        public bool IsActive { get; set; }
        public bool IsAssigned { get; set; }
        public int MachineType { get; set; }
        public string SerialNumber { get; set; }
        public string TanFolder { get; set; }

    }
}