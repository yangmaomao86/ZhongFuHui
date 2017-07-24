using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.Expressions;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class DashiController : ApiController
    {
        [HttpPost]
        public DashiInfo get_list()
        {
            List<int> listyear = new List<int>();
            List<Getdashilist> list = new List<Getdashilist>();
            Getdashilist m;
            DashiInfo model = new DashiInfo();
            using (var db = new TongYuPortalDB())
            {
                var year = db.dashi.GroupBy(g => g.year).OrderByDescending(g => g.Key).Take(10).ToList();
                for (int i = 0; i < year.Count; i++)
                {
                    listyear.Add(Convert.ToInt32(year[i].Key));
                }
                var listy = listyear.OrderBy(g => g).ToList();
                model.getyearlist = listy;
                var dashid = db.dashi;
                for (int i = 0; i < listy.Count; i++)
                {
                    m = new Getdashilist();
                    var jnub = listy[i];
                    m.getdashilist = dashid.Where(t => t.year == jnub).ToList();
                    list.Add(m);
                }
                model.getdashilistsecond = list;
                model.getdashiquanlist = dashid.ToList();
            }
            return model;
        }

        [HttpPost]
        public List<dashi> get_dashi_list()
        {
            using (var db = new TongYuPortalDB())
            {
                return db.dashi.OrderByDescending(g=>g.year).ThenBy(g=>g.createdate).ToList();
            }
        }
        [HttpPost]
        public int delete(dashi j)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    var list = db.dashi.Find(j.id);
                    db.dashi.Remove(list);
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
        public int add_dashi(dashi e)
        {
            try
            {
                using (var db = new TongYuPortalDB())
                {
                    DateTime dtnow=DateTime.Now;
                    if (e.id > 0)
                    {
                        //update 
                        var up = db.dashi.Find(e.id);
                        up.modifydate=DateTime.Now;
                        up.jiancheng = e.jiancheng;
                        up.content = e.content;
                        up.title = e.title;
                        up.year = e.year;
                    }
                    else
                    {
                        //add
                        db.dashi.Add(new dashi()
                        {
                            content = e.content,
                            jiancheng = e.jiancheng,
                            title = e.title,
                            createdate = dtnow,
                            modifydate = dtnow,
                            year = e.year
                        });
                    }
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception )
            { 
                return 0;
            }
        }
    }
}
