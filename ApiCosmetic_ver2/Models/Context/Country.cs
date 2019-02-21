using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiCosmetic_ver2.Models.Context
{
    public class Country: IComparable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }

        public int CompareTo(object o)
        {
            Country c = o as Country;
            if (c != null)
            {
                return this.Name.CompareTo(c.Name);
            }
            else
                throw new Exception("Никак сравнить");
        }
    }
}