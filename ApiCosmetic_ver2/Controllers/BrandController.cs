using ApiCosmetic_ver2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
    public class BrandController : ApiController
    {

        Context db = new Context();

        public HttpResponseMessage Get()
        {
            var brands = db.Brands;
            return Request.CreateResponse<IEnumerable<Brand>>(HttpStatusCode.OK, brands);
        }

        public HttpResponseMessage Get(int id)
        {
            var brand = db.Brands.Find(id);
            var responce = Request.CreateResponse<Brand>(HttpStatusCode.OK, brand);
            return responce;
        }
        [Authorize]
        public void Post([FromBody]Brand value)
        {
            db.Brands.Add(value);
            db.SaveChanges();
        }
        [Authorize]
        public void Put(int id, [FromBody]Brand value)
        {
            var brand = db.Brands.Find(id);
            if (brand != null && value != null)
            {
                if (value.Name!=null) brand.Name = value.Name;
                if (value.Description != null) brand.Description = value.Description;
                if (value.Image != null) brand.Image = value.Image;
                if (value.CountryId != 0) brand.CountryId = value.CountryId;
                db.SaveChanges();
            }
        }
        [Authorize]
        public void Delete(int id)
        {
            Brand brand = db.Brands.Find(id);
            if (brand != null)
            {
                db.Brands.Remove(brand);
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
