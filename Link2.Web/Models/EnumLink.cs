using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class EnumLink
    {
        public enum LisSystemType
        {
            FolderChannel=4000,
            SerialChannel = 4001,
            TCPChannel = 4002
        }
        public enum InstrumentType
        {
            Erytra = 1,
            DGReader = 2,
            Wadiana = 3,
            ErytraEflexis=4,
            DGReaderNet=5
        }
    }
}