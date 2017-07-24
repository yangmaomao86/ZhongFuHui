﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class LiuyanbanController : ApiController
    {
        [HttpPost]
        public List<message> list()
        {
            using (var db=new TongYuPortalDB())
            {
                var list = db.message.OrderByDescending(n=>n.createdate).ToList();
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
                    var list = db.message.Find(j.id);
                    db.message.Remove(list);
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
