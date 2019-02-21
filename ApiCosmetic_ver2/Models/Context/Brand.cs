using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiCosmetic_ver2.Models.Context
{
    public class Brand: IComparable
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }

        public int CompareTo(object o)
        {
            Brand b = o as Brand;
            if (b != null)
                return this.Name.CompareTo(b.Name);
            else
                throw new Exception("Никак сравнить");
        }
    }
}