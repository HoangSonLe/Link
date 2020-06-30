using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class AddInstrumentToLabModelView
    {
        public List<Models.Instrument> ListItems { get; set; }
        public int LabId { get; set; }
    }
}