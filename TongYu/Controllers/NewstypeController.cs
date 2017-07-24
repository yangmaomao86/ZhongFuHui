using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class NewstypeController : ApiController
    {
        [HttpPost]
        public List<newstype> list()
        {
            using (var db = new TongYuPortalDB())
            {
                var list = db.newstype.OrderByDescending(g => g.createdate).ToList();
                return list;
            }
        }

        [HttpPost]
        public int save(newstype obj)
        {
            try
            {
                if (obj.id == 0)
                {
                    //add
                    using (var db = new TongYuPortalDB())
                    {
                        obj.createdate = DateTime.Now;
                        obj.modifydate = DateTime.Now;
                        db.newstype.Add(obj);
                        db.SaveChanges();
                    }
                }
                else
                {
                    //edit          
                    using (var db = new TongYuPortalDB())
                    {
                        var ret = db.newstype.Find(obj.id);
                        ret.newstypename = obj.newstypename;
                        ret.modifydate = DateTime.Now;
                        db.SaveChanges();
                    }
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        [HttpPost]
        public int remove(newstype obj)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    db.newstype.Remove(db.newstype.Find(obj.id));
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
