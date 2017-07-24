using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace portal.handler
{
    /// <summary>
    /// UploadHandler 的摘要说明
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            try
            {

                var pid = context.Request["pid"];

                var httpPostedFile = HttpContext.Current.Request.Files[0];
                if (httpPostedFile != null)
                {
                    string path ="~/UploadFiles/";
                    
                    string fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(httpPostedFile.FileName);
                    string savePath = path + fileName;
                    
                    httpPostedFile.SaveAs(HttpContext.Current.Server.MapPath(savePath));

                    //PatientUploadPictures picture = new PatientUploadPictures();
                    //picture.PatientID = Int32.Parse(currentUserID);
                    //picture.PictureName = fileName;
                    //picture.UploadTime = DateTime.Now;
                    //picture.CreateTime = DateTime.Now;
                    //picture.ModifyDate = DateTime.Now;
                    //picture.IsDelete = false;

                    //db.PatientUploadPictures.Add(picture);
                    //db.SaveChanges();

                    string data = "ok";
                    context.Response.ContentType = "text/json;charset=UTF-8;";
                    context.Response.Write(serializer.Serialize(data));
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