using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace TongYu.backend.plugins.umeditor.dot_net
{
    /// <summary>
    /// Summary description for UploadHandler
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                var httpPostedFile = HttpContext.Current.Request.Files["upfile"];
                var id = context.Request["id"];
                if (httpPostedFile != null)
                {
                    //string path = ConfigurationManager.AppSettings["UploadPath"];
                    string path = System.AppDomain.CurrentDomain.BaseDirectory + "backend\\plugins\\umeditor\\upload\\";
                    string fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(httpPostedFile.FileName);
                    string savePath = path + fileName;
                    httpPostedFile.SaveAs(savePath);

                    //如果是更新图片，那么更改这个图片的字段对应的值！
                    //var db = new Entities();
                    //var article = db.KnowledgeBase.FirstOrDefault(n => n.KB_ID.ToString() == id);
                    //if (article != null)
                    //{
                    //    article.KBImage = "/Upload/" + fileName;
                    //    db.SaveChanges();
                    //}

                    var obj = new
                    {
                        type = "success",
                        imageurl = savePath
                    };

                    context.Response.ContentType = "text/json;charset=UTF-8;";
                    context.Response.Write(serializer.Serialize(obj));
                }
            }
            catch (Exception)
            {
                var obj = new
                {
                    type = "fail"
                };
                context.Response.ContentType = "text/json;charset=UTF-8;";
                context.Response.Write(serializer.Serialize(obj));
            }
        }



        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}