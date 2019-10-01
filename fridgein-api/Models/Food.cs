using System;
using System.Collections.Generic;

namespace fridgein_api.Models
{
    public partial class Food
    {
        public Food()
        {
            Stockitem = new HashSet<Stockitem>();
        }

        public int FoodId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Stockitem> Stockitem { get; set; }
    }
}
