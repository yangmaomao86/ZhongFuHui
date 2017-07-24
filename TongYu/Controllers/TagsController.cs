using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class TagsController : ApiController
    {
        [HttpPost]
        public List<tags> get_list(tags t)
        {
            using (var db=new TongYuPortalDB() )
            {
                return db.tags.Where(n => n.newsnub == t.newsnub).ToList();
            }
        }
    }
}
