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
    public class CompanyController : ApiController
    {
        [HttpPost]
        public List<company> get_list()
        {
            using (var db=new TongYuPortalDB())
            {
                var list = db.company.ToList();
                return list;
            }
        }

        [HttpPost]
        public int add_item(TempClass1 temp)
        {
            try
            {
                using (var db=new TongYuPortalDB())
                {
                    var obj=new company();
                    obj.remark = temp.remark;
                    obj.url = temp.link;
                    obj.createdate=DateTime.Now;
                    obj.modifydate=DateTime.Now;
                    db.company.Add(obj);
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
        public int update_item(TempClass2 temp)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    var obj = db.company.Find(temp.id);
                    obj.remark = temp.remark;
                    obj.url = temp.link;
                    obj.modifydate = DateTime.Now;
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
        public int delete([FromBody]int id)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    var obj = db.company.Find(id);
                    db.company.Remove(obj);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception)
            {
                return 0;
                throw;
            }

        }

        [HttpPost]
        public int update_compaly_url(company c)
        {
            try
            {
                using (var db=new TongYuPortalDB())
                {
                    if (c.id>0)
                    {
                        var cm = db.company.Where(n => n.id == c.id).Single();
                        cm.url = c.url;
                        cm.photourl = c.photourl;
                    }
                    else
                    {
                        db.company.Add(new company()
                        {
                            url = c.url,
                            createdate = DateTime.Now,
                            modifydate = DateTime.Now,
                            photourl = c.photourl
                        });
                    }
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

    public class TempClass1
    {
        public string remark { get; set; }
        public string link { get; set; }
    }

    public class TempClass2 : TempClass1
    {
        public int id { get; set; }
    }
}
