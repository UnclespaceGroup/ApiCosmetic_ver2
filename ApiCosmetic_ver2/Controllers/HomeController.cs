﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiCosmetic_ver2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Cosmetic App";

            return View();
        }
        public ActionResult Images()
        {

            return View();
        }
    }
}
