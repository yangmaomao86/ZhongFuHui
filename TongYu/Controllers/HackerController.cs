using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using TongYu.infrastructure;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class HackerController : ApiController
    {
        public void Options()
        {
        }

        [SupportCrossDomain]
        [HttpPost]
        public object list(dynamic obj)
        {
            try
            {
                int offset = Int32.Parse(obj.offset.ToString());
                int items = Int32.Parse(obj.items.ToString());
                using (var db = new TongYuPortalDB())
                {
                    var list = db.demo_hacker_news.OrderByDescending(n=>n.id).Skip(offset).Take(items).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [SupportCrossDomain]
        [HttpGet]
        public List<demo_hacker_news> all()
        {
            using (var db = new TongYuPortalDB())
            {
                var list = db.demo_hacker_news.ToList();
                return list;
            }
        } 

    }
}
