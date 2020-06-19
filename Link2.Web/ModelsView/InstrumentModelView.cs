using Link2.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class InstrumentModelView
    {
        public List<Instrument> InstrumentList { get; set; }
        public Instrument NewInstrument { get; set; }
    }
}