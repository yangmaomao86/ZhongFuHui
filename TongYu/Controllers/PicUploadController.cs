using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TongYu.Models;
using TongYuPortal.Models;

namespace TongYuPortal.Controllers
{
    public class PicUploadController : ApiController
    {
        [HttpPost]
        public string upload()
        {
            try
            {
                var file = HttpContext.Current.Request.Files["files"];
                var id=HttpContext.Current.Request["id"];

                var db=new TongYuPortalDB();

                using (System.Drawing.Image img = System.Drawing.Image.FromStream(file.InputStream))
                {
                    string fileName = System.IO.Path.GetFileName(file.FileName);
                    string[] splitFileName = fileName.Split('.');
                    string atterFileName = DateTime.Now.ToString("yyyMMddHHmmss") + "." + splitFileName[1];
                    img.Save(HttpContext.Current.Server.MapPath("/upload/" + atterFileName));

                    var c=db.company.Find(Int32.Parse(id));
                    c.photourl = atterFileName;
                    db.SaveChanges();

                    return atterFileName;
                }
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
