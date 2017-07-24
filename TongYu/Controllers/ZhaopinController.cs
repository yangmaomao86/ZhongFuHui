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
    public class ZhaopinController : ApiController
    {
        [HttpPost]
        public List<job> list()
        {
            using (var db=new TongYuPortalDB())
            {
                var list = db.job.ToList();
                return list;
            }
        }

        [HttpPost]
        public int delete(job j)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    var list = db.job.Find(j.id);
                    db.job.Remove(list);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception)
            {
                return 0;
            }
            
        }

        [HttpPost]
        public int save(job obj)
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
                        db.job.Add(obj);
                        db.SaveChanges();
                    }
                }
                else
                {
                    //edit          
                    using (var db = new TongYuPortalDB())
                    {
                        var ret = db.job.Find(obj.id);
                        ret.Jobname = obj.Jobname;
                        ret.remark = obj.remark;
                        ret.jobcontent = obj.jobcontent;
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
    }
}
