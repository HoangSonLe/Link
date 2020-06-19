using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class LabConfigurationDefault
    {
        public LabModelView Lab { get; set; }
        public LisModelView Lis { get; set; }
        public InstrumentModelView Instrument { get; set; }
    }
}