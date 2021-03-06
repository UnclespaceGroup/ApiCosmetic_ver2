﻿using ApiCosmetic_ver2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiCosmetic_ver2.Controllers
{
    [Authorize]
    public class ManageController : Controller
    {
        Context db = new Context();

        public ActionResult Index()
        {
            IEnumerable<Review> reviews = db.Reviews;
            IEnumerable<Brand> brands = db.Brands.ToList();
            ViewBag.brands = brands;
            IEnumerable<Country> countries = db.Countries.ToList();
            ViewBag.country = countries;
            reviews.Reverse();
            return View(reviews);
        }
        public ActionResult Country()
        {
            IEnumerable<Country> countries = db.Countries;
            return PartialView(countries);
        }
        public ActionResult Brand()
        {
            IEnumerable<Country> countries = db.Countries.ToList();
            ViewBag.country = countries;
            IEnumerable<Brand> brands = db.Brands;
            return PartialView(brands);
        }
        public ActionResult Comment()
        {
            IEnumerable<Comment> comments = db.Comments.ToList();
            comments.Reverse();
            return View(comments);
        }
        public ActionResult Users()
        {
            IEnumerable<User> users = db.Users.ToList();
            users.Reverse();
            return View(users);
        }
        public ActionResult AddSomething()
        {
            return View();
        }
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}