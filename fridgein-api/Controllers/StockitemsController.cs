using fridgein_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace fridgein_api.Controllers
{
    [Route("api/stockitem")]
    [ApiController]
    
    public class StockitemsController : ControllerBase
    {
        private readonly FridgeInDbContext _context;

        public StockitemsController(FridgeInDbContext context)
        {
            _context = context;
        }

        // GET: api/stockitem/
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Stockitem>>> GetStockitem(int id)
        {
            

            ICollection<Stockitem> allItems = await _context.Stockitem
                .Where(s => s.UserId == id)
                .Include(s => s.Food)
                .Include(s => s.User)
                .ToListAsync();

            foreach (var item in allItems)
            {
                item.Food.User = null;
                item.Food.Stockitem = null;
                item.User.Food = null;
                item.User.Stockitem = null;
            }

            return Ok(allItems);
        }

        // DELETE: api/stockitem/del/5
        [HttpDelete("{id}/{userid}")]
        public async Task<ActionResult<Stockitem>> DeleteStockitem(int id, int userid)
        {
            var stockitem = await _context.Stockitem.Where(s => s.StockitemId == id && s.UserId == userid).FirstAsync();
            if (stockitem == null)
            {
                Debug.WriteLine("not found -------------------");
                return NotFound();
            }

            _context.Stockitem.Remove(stockitem);
            await _context.SaveChangesAsync();

            return stockitem;
        }

        // Delete on FoodId
        // DELETE: api/stockitem/delall/5
        [HttpDelete("delall/{id}/{userId}")]
        public async Task<ActionResult<Stockitem>> DeleteAllStockitems(int id, int userId)
        {
            try
            {
                 _context.Stockitem.RemoveRange(_context.Stockitem.Where(s => s.Food.FoodId == id && s.UserId == userId).ToList());
                            await _context.SaveChangesAsync();
                            return Ok();
            }
            catch (System.Exception)
            {

                throw;
            } 
        }

        private bool StockitemExists(int id)
        {
            return _context.Stockitem.Any(e => e.StockitemId == id);
        }
    }
}
