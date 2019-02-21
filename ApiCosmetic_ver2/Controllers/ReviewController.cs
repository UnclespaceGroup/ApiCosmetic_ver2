using ApiCosmetic_ver2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
    public class ReviewController : ApiController
    {
        Context db = new Context();

        public HttpResponseMessage Get()
        {
            var reviews = db.Reviews;
            return Request.CreateResponse<IEnumerable<Review>>(HttpStatusCode.OK, reviews);
        }

        public HttpResponseMessage Get(int id)
        {
            var review = db.Reviews.Find(id);
            var responce = Request.CreateResponse<Review>(HttpStatusCode.OK, review);
            return responce;
        }

        public void Post([FromBody]Review value)
        {
            db.Reviews.Add(value);
            db.SaveChanges();
        }

        public void Put(int id, [FromBody]Review value)
        {
            var review = db.Reviews.Find(id);
            if (review != null)
            {
                if (value != null)
                {
                    if (value.Title != null) review.Title = value.Title;
                    if (value.Text != null) review.Text = value.Text;
                    if (value.UserId != -1) review.UserId = value.UserId;
                    if (value.BrandId != -1) review.BrandId = value.BrandId;
                    if (value.CountryId != -1) review.CountryId = value.CountryId;
                    if (value.Tags != null) review.Tags = value.Tags;
                    if (value.Image != null) review.Image = value.Image;
                    if (value.Image2 != null) review.Image2 = value.Image2;
                    if (value.Image3 != null) review.Image3 = value.Image3;
                    if (value.Active) review.Active = !review.Active;
                }
                db.SaveChanges();
            }
        }
        [Authorize]
        public void Delete(int id)
        {
            Review review = db.Reviews.Find(id);
            if (review != null)
            {
                db.Reviews.Remove(review);
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
