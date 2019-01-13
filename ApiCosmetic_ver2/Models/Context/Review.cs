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

        public int BrandId { get; set; }
        public int CountryId { get; set; }
        public int UserId { get; set; }

        public string Image { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }

        public bool Active { get; set; }

        public int Rating { get; set; }
        public string Date { get; set; }
    }
}