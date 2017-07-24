using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;

namespace HuiSu.Models
{
    public class NewsInNewsTypeInfo
    {
        public int id { get; set; }
        public  string newstypename { get; set; }
        public  string title { get; set; }
        public string newscontent { get; set; }
        public  int? yuedunub { get; set; }
        public  int? newstypeid { get; set; }
        public  string author { get; set; }
        public  string  createdate { get; set; }
    }
}