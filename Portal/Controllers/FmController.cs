using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using HuiSu.Models;

namespace HuiSu.Controllers
{
    public class FmController : ApiController
    {


        [HttpPost]
        public object get_list()
        {
            using (var db = new ZhongFuHuiEntities())
            {
                return db.fm.Where(n=>n.IsValid==1).ToLookup(n => n.LeiBie);
            }
        }
    }
}