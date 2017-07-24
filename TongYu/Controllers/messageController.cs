using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.DynamicData.ModelProviders;
using System.Web.Http;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class MessageController : ApiController
    {
        [HttpPost]
        public int employee_mobile(message m)
        {
            using (var db = new TongYuPortalDB())
            { 
                db.message.Add(new message()
                {
                    Messagecontent = m.Messagecontent,
                    messagename = m.messagename,
                    mobile = m.mobile,
                    createdate = DateTime.Now,
                    modifydate = DateTime.Now,
                    email = m.email
                });
                db.SaveChanges();
            }
            return 1;
        }

        [HttpPost]
        public List<message> get_list()
        {
            using (var db = new TongYuPortalDB())
            {
                return db.message.OrderByDescending(n=>n.createdate).ToList();
            }
        }
        [HttpPost]
        public int delete(job j)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    var obj = db.message.Find(j.id);
                    db.message.Remove(obj);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception)
            {
                return 0;
            }

        }
    }
}
