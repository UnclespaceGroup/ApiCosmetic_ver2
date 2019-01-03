﻿using ApiCosmetic_ver2.Models.Context;
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

        public void Post([FromBody]Brand value)
        {
            db.Brands.Add(value);
            db.SaveChanges();
        }

        public void Put(int id, [FromBody]string value)
        {
        }

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
