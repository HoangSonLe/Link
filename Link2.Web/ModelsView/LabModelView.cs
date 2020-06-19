using Link2.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class LabModelView
    {
        public List<Laboratory> LabList { get; set; }
        public Laboratory NewLab { get; set; }
    }
}