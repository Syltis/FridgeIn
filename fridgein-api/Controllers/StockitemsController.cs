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

        // GET: api/stockitem/readuniqueonuser
        [HttpGet]
        [Route("getgroupedonuser/{email}")]
        public async Task<ActionResult<IEnumerable<Stockitem>>> GetStockitemGroupedOnUser(string email)
        {
            User user = await _context.User.Where(u => u.Email == email).FirstAsync();

            // Get list of all stockitems
            ICollection<Stockitem> allItems = await _context.Stockitem
                .Where(s => s.UserId == user.UserId)
                .Include(s => s.Food)
                .ToListAsync();

            //List<Stockitem> distinctItems = allItems
                //.GroupBy(s => new { s.FoodId, s.PurchaseDate, s.ExpirationDate })
                //.Select(g => g.First())
                //.ToList();

            // Group by chosen fiels
            var grouped = allItems.GroupBy(x => new { x.FoodId, x.PurchaseDate, x.ExpirationDate });


            return Ok(grouped);
        }

        // GET: api/stockitem/getgroupedbytypeonuser
        [HttpGet]
        [Route("getgroupedbytypeonuser/{email}")]
        public async Task<ActionResult<IEnumerable<Stockitem>>> GetStockitemGroupedByTypeOnUser(string email)
        {
            User user = await _context.User.Where(u => u.Email == email).FirstAsync();

            ICollection<Stockitem> allItems = await _context.Stockitem
                .Where(s => s.UserId == user.UserId)
                .Include(s => s.Food)
                .ToListAsync();

            var grouped = allItems.GroupBy(x => new { x.Food.Type });

            return Ok(grouped);
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
