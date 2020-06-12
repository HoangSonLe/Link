using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class FolderChannel
    {
        public int Id { get; set; }
        public string InputFile { get; set; }
        public bool NeedAck { get; set; }
        public string OutputFile { get; set; }
        public string RootFolder { get; set; }
    }
}