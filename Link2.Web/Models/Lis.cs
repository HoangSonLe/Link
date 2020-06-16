using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class Lis
    {
        public int RouterID { get; set; }
        public int LisId { get; set; }
        public bool IsMirror { get; set; }
        public LisSystem LisSystem { get; set; }
    }
}