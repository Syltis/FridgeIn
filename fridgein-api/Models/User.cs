using System;
using System.Collections.Generic;

namespace fridgein_api.Models
{
    public partial class User
    {
        public User()
        {
            Food = new HashSet<Food>();
            Stockitem = new HashSet<Stockitem>();
        }

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public  ICollection<Food> Food { get; set; }
        public  ICollection<Stockitem> Stockitem { get; set; }
    }
}
