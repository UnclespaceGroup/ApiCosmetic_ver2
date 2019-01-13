using ApiCosmetic_ver2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
    public class UserController : ApiController
    {
        Context db = new Context();

        public HttpResponseMessage Get()
        {
            var users = db.Users;
            var responce = Request.CreateResponse<IEnumerable<User>>(HttpStatusCode.OK, users);
            return responce;
        }

        public HttpResponseMessage Get(int id)
        {
            var user = db.Users.Find(id);
            var responce = Request.CreateResponse<User>(HttpStatusCode.OK, user);
            return responce;
        }

        public void Post([FromBody]User value)
        {
            db.Users.Add(value);
            db.SaveChanges();
        }

        public void Put(int id, [FromBody]User value)
        {
            var user = db.Users.Find(id);
            if (user != null && value != null)
            {
                if (value.Name != null) user.Name = value.Name;
                if (value.Avatar != null) user.Avatar = value.Avatar;
                db.SaveChanges();
            }
        }
        [Authorize]
        public void Delete(int id)
        {
            User user = db.Users.Find(id);
            if (user != null)
            {
                db.Users.Remove(user);
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
