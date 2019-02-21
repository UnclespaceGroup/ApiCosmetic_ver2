using ApiCosmetic_ver2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
    public class CommentController : ApiController
    {
        Context db = new Context();

        public HttpResponseMessage Get()
        {
            var comments = db.Comments;
            return Request.CreateResponse<IEnumerable<Comment>>(HttpStatusCode.OK, comments);
        }

        public HttpResponseMessage Get(int id)
        {
            var comment = db.Comments.Find(id);
            var responce = Request.CreateResponse<Comment>(HttpStatusCode.OK, comment);
            return responce;
        }

        public void Post([FromBody]Comment value)
        {
            if (value != null)
            {
                db.Comments.Add(value);
                db.SaveChanges();
            }
        }

        [Authorize]
        public void Delete(int id)
        {
            Comment comment = db.Comments.Find(id);
            if (comment != null)
            {
                db.Comments.Remove(comment);
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
