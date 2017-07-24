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
    public class EmployeeController : ApiController
    {
        [HttpPost]
        public Object login(dynamic obj)
        {
            var db = new TongYuPortalDB();
            var mobile = (string)obj.mobile.ToString();
            var pwd = (string)obj.pwd.ToString();
            var model = db.employee.FirstOrDefault(n => n.mobile == mobile && n.password == pwd);
            if (model != null)
            {
                return Json(new
                {
                    name = model.employeename,
                    mobile = model.mobile,
                    id = model.id
                });
            }
            else
            {
                return "";
            }
        }
    }
}
