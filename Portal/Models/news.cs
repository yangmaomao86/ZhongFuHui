//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace HuiSu.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class news
    {
        public int id { get; set; }
        public string title { get; set; }
        public string newscontent { get; set; }
        public Nullable<int> newstypeid { get; set; }
        public Nullable<int> yuedunub { get; set; }
        public string author { get; set; }
        public Nullable<int> isindex { get; set; }
        public string fengmiantu { get; set; }
        public string newsnub { get; set; }
        public Nullable<System.DateTime> createdate { get; set; }
        public Nullable<System.DateTime> modifydate { get; set; }
    }
}