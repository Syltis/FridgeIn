using System;
using System.Collections.Generic;

namespace fridgein_api.Models
{
    public partial class Stockitem
    {
        public int StockitemId { get; set; }
        public int FoodId { get; set; }
        public DateTime BoughtAt { get; set; }
        public DateTime? ExpirationDate { get; set; }

        public Food Food { get; set; }
    }
}
