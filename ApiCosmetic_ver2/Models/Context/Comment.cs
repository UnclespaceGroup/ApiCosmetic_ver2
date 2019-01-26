using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiCosmetic_ver2.Models.Context
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int ReviewId { get; set; }
    }
}