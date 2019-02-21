using ApiCosmetic_ver2.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
    public class LogController : ApiController
    {
        string root = System.Web.HttpContext.Current.Server.MapPath("~/Logs/log.txt");

        public HttpResponseMessage Get()
        {
            List<string> result = new List<string>();
            using (StreamReader sr = new StreamReader(root, System.Text.Encoding.Default))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    result.Add(line);
                }
            }
            return Request.CreateResponse<List<string>>(HttpStatusCode.OK, result);
        }

        public void Post([FromBody]LogModel log)
        {
            using (StreamWriter sw = new StreamWriter(root, true, System.Text.Encoding.Default))
            {
                DateTime now = new DateTime();
               sw.Write("{0} {1} {2} {3} \n", now.Date.Day.ToString() + ' ' + now.Date.TimeOfDay.ToString(), log.Type, log.Title, log.Text);
            }
        }
    }
}
