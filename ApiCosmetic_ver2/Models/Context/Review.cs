using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiCosmetic_ver2.Models.Context
{
    public class Review
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string BrandId { get; set; }
        public int UserId { get; set; }
        public bool Active { get; set; }
    }
}