using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TongYu.Models;

namespace TongYuPortal.Models
{
    public class DashiInfo
    {
        public  List<int> getyearlist { get; set; } 
        public  List<Getdashilist> getdashilistsecond { get; set; } 
        public  List<dashi> getdashiquanlist { get; set; }
    }

    public class Getdashilist
    {
        public List<dashi> getdashilist { get; set; }
    }
}