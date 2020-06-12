using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace Link2.Web.Models
{
    public class TCPChannel
    {
        public int Id { get; set; }
        public string Ip { get; set; }
        public int Port { get; set; }
        public int? TimeOut { get; set; }
    }
}