using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class SerialChannel
    {
        public int Id { get; set; }
        public string PortName { get; set; }
        public bool DTSDSR { get; set; }
        public bool RTSCTS { get; set; }
        public int TimeOut { get; set; }
        public int BaudRate { get; set; }
        public int Handshake { get; set; }
        public int StopBits { get; set; }
        public int Parity { get; set; }
    }
}