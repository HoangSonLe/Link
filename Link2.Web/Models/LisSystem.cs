using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class LisSystem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public bool CanDelete { get; set; }
        public bool AutoExport { get; set; }
        public string TimeZoneId { get; set; }
        public bool SendQCResult { get; set; }
        public FolderChannel FolderChannel { get; set; }
        public TCPChannel TCPChannel { get; set; }
        public SerialChannel SerialChannel { get; set; }
        public int CommunicationMode { get; set; }
        public int ChannelId { get; set; }

    }
}