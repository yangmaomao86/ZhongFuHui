using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using HuiSu.infrastructure;
using HuiSu.Models;

namespace HuiSu.Controllers
{
    public class NewsController : ApiController
    {
        public void Options() { }

        [SupportCrossDomain]
        [HttpGet]
        public List<news> get_news_list_demo_only()
        {
            using (var db = new ZhongFuHuiEntities())
            {
                var list = db.news.Where(n => n.isindex == 1).OrderByDescending(g => g.createdate).ToList();
                return list;
            }
        }

        [SupportCrossDomain]
        [HttpGet]
        public List<message> liuyan()
        {
            using (var db = new ZhongFuHuiEntities())
            {
                var list = db.message.OrderByDescending(g => g.createdate).Take(100).ToList();
                return list;
            }
        }

        [SupportCrossDomain]
        [HttpPost]
        public List<news> get_list()
        {
            using (var db = new ZhongFuHuiEntities())
            {
                var list = db.news.Where(n => n.isindex == 1).OrderByDescending(g => g.createdate).ToList();
                return list;
            }
        }

        [HttpPost]
        public List<NewsInNewsTypeInfo> get_news_newstype_list()
        {
            List<NewsInNewsTypeInfo> list = new List<NewsInNewsTypeInfo>();
            NewsInNewsTypeInfo m;
            using (var db = new ZhongFuHuiEntities())
            {
                var list1 = (from newsd in db.news
                             join newstyped in db.newstype on newsd.newstypeid equals newstyped.id into temp
                             from tt in temp.DefaultIfEmpty()
                             orderby newsd.createdate descending
                             select new
                             {
                                 author = newsd.author,
                                 id = newsd.id,
                                 newscontent = newsd.newscontent,
                                 newstypeid = newsd.newstypeid,
                                 createdate = newsd.createdate,
                                 title = newsd.title,
                                 yuedunub = newsd.yuedunub,
                                 newstypename = tt.newstypename
                             }).ToList();
                foreach (var lt in list1)
                {
                    m = new NewsInNewsTypeInfo();
                    m.createdate = Convert.ToDateTime(lt.createdate).ToString("yyyy-MM-dd");
                    m.id = lt.id;
                    m.newscontent = lt.newscontent;
                    m.newstypename = lt.newstypename;
                    m.author = lt.author;
                    m.newstypeid = lt.newstypeid;
                    m.title = lt.title;
                    m.yuedunub = lt.yuedunub;
                    list.Add(m);
                }
                return list;
            }
        }

        [HttpPost]
        public int delete(job j)
        {
            try
            {
                using (var db = new ZhongFuHuiEntities())
                {
                    var list = db.news.Where(g => g.id == j.id).First();
                    db.news.Remove(list);
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
        public int add_news(newsinfo n)
        {
            try
            {
                if (n.id == 0)
                {
                    using (var db = new ZhongFuHuiEntities())
                    {
                        string newsnub1 = Guid.NewGuid().ToString();
                        var list = db.news.Add(new news()
                        {
                            author = n.author,
                            newscontent = n.newscontent,
                            title = n.title,
                            createdate = DateTime.Now,
                            isindex = 1,
                            modifydate = DateTime.Now,
                            newstypeid = n.newstypeid,
                            yuedunub = 0,
                            fengmiantu = n.fengmiantu,
                            newsnub = newsnub1
                        });
                        //foreach (var item in db.tags.Where(t => t.newsnub == newsnub1).ToList())
                        //{
                        //    db.tags.Remove(item);
                        //}
                        //foreach (var item in n.newsTag.Split('/'))
                        //{
                        //    if (!string.IsNullOrEmpty(item))
                        //    {
                        //        db.tags.Add(new tags()
                        //        {
                        //            tag = item,
                        //            newsnub = newsnub1
                        //        });
                        //    }
                        //}

                        db.news.Add(list);
                        db.SaveChanges();
                        return 1;
                    }
                }
                else
                {
                    using (var db = new ZhongFuHuiEntities())
                    {
                        var list = db.news.Where(g => g.id == n.id).Single();
                        list.modifydate = DateTime.Now;
                        list.newscontent = n.newscontent;
                        list.title = n.title;
                        list.newstypeid = n.newstypeid;
                        list.author = n.author;
                        list.fengmiantu = n.fengmiantu;
                        //foreach (var item in db.tags.Where(t => t.newsnub == list.newsnub).ToList())
                        //{
                        //    db.tags.Remove(item);
                        //}
                        //foreach (var item in n.newsTag.Split('/'))
                        //{
                        //    if (!string.IsNullOrEmpty(item))
                        //    {
                        //        db.tags.Add(new tags()
                        //        {
                        //            tag = item,
                        //            newsnub = list.newsnub
                        //        });
                        //    }
                        //}

                        
                        db.SaveChanges();
                        return 1;
                    }
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        [HttpPost]
        public news get_news(news n)
        {
            using (var db = new ZhongFuHuiEntities())
            {
                return db.news.Where(g => g.id == n.id).FirstOrDefault();
            }
        }

        [HttpPost]
        public Object get_news_by_id([FromBody]int id)
        {
            using (var db=new ZhongFuHuiEntities())
            {
                var q = from n in db.news
                    from t in db.newstype
                    where n.newstypeid == t.id && n.id == id
                    select new
                    {
                        id=n.id,
                        newstypename=t.newstypename,
                        createdate=n.createdate,
                        newscontent=n.newscontent,
                        title=n.title,
                        author=n.author
                    };
                return q.ToList().FirstOrDefault();
            }
        }
    }
}