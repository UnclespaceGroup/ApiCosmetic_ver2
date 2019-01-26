using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ApiCosmetic_ver2.Models.Context;

namespace ApiCosmetic_ver2.Models.Context
{
    public class Context: DbContext
    {
        public Context(): base("Context") { }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}