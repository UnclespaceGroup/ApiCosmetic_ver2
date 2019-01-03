using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiCosmetic_ver2.Models.Context
{
    public class Brand
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}