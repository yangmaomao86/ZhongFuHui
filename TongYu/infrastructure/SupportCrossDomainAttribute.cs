using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace TongYu.infrastructure
{
    public class SupportCrossDomainAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            var resHeaders = actionExecutedContext.Response.Headers;

            if (AllowCredentials)
            {
                resHeaders.Add("Access-Control-Allow-Credentials", "true");
            }

            resHeaders.Add("Access-Control-Allow-Origin", Origin ?? "*");

            base.OnActionExecuted(actionExecutedContext);
        }

        public bool AllowCredentials { get; set; }
        public string Origin { get; set; }
    }
}