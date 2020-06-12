using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Link2.Web.Models
{
    public class Laboratory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public int TimeZoneId { get; set; }
        public  List<Lis> LisInRouters { get; set; }
        public List<Lis> LisSystems { get; set; }
    }
}