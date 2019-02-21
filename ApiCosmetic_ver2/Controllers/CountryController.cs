using ApiCosmetic_ver2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
   
    public class CountryController : ApiController
    {
        Context db = new Context();

        public HttpResponseMessage Get()
        {
            List<Country> a = db.Countries.ToList();
            a.Sort();
            return Request.CreateResponse(HttpStatusCode.OK, a);
        }
        public string Get(int id)
        {
            return "ok";
        }
        [Authorize]
        public void Post([FromBody]Country value)
        {
            db.Countries.Add(value);
            db.SaveChanges();
        }
        [Authorize]
        public void Put(int id, [FromBody]Country value)
        {
            var country = db.Countries.Find(id);
            if (country != null && value != null)
            {
                if (value.Name != null) country.Name = value.Name;
                if (value.Image != null) country.Image = value.Image;
                db.SaveChanges();
            }
        }
        [Authorize]
        public void Delete(int id)
        {
            Country country = db.Countries.Find(id);
            if (country != null)
            {
                db.Countries.Remove(country);
                db.SaveChanges();
            }
        }
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
