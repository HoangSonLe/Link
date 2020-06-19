using Link2.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class LisModelView
    {
        public List<LisSystem> LisList { get; set; }
        public LisSystem NewLis { get; set; }
    }
}