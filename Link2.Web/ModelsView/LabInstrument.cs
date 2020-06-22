using Link2.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.ModelsView
{
    public class LabInstrument
    {
        public int Id { get; set; }
        public List<Instrument> Instruments { get; set; }
    }
}