using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TongYuPortal.Models
{
    public class newsinfo
    {
        public int id { get; set; }
        public string title { get; set; }
        public string newscontent { get; set; }
        public Nullable<int> newstypeid { get; set; }
        public Nullable<int> yuedunub { get; set; }
        public string author { get; set; }
        public Nullable<int> isindex { get; set; }
        public string fengmiantu { get; set; }
        public Nullable<System.DateTime> createdate { get; set; }
        public Nullable<System.DateTime> modifydate { get; set; }
        public string newsnub { get; set; }
        public  string newsTag { get; set; }
    }
}