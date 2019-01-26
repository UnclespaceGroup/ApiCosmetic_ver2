using ApiCosmetic_ver2.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ApiCosmetic_ver2.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            ViewBag.Title = "Cosmetic App";

            return View();
        }
        public async Task<ActionResult> Initial()
        {
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));
            var admin = new ApplicationUser { Email = "admin@unclespace.ru", UserName = "unclespace" };
            string password = "uncle123";
            IdentityResult result = await userManager.CreateAsync(admin, password);
            if (result.Succeeded)
            {
                return View("Index");
            }
            else
            {
                return View("Error", result.Errors);
            }
        }
    }
}
