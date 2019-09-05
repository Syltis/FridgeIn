using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fridgein_api.Models;
using Microsoft.AspNetCore.Cors;

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

        // GET: api/Stockitems
        [HttpGet]
        [Route("readall")]
        public async Task<ActionResult<IEnumerable<Stockitem>>> GetStockitem()
        {
            return await _context.Stockitem.Include(s => s.Food).ToListAsync();
        }

        // GET: api/Stockitems/5
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Stockitem>> GetStockitem(int id)
        {
            var stockitem = await _context.Stockitem.FindAsync(id);

            if (stockitem == null)
            {
                return NotFound();
            }

            return stockitem;
        }

        // PUT: api/Stockitems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockitem(int id, Stockitem stockitem)
        {
            if (id != stockitem.StockitemId)
            {
                return BadRequest();
            }

            _context.Entry(stockitem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockitemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Stockitems
        [HttpPost]
        public async Task<ActionResult<Stockitem>> PostStockitem(Stockitem stockitem)
        {
            _context.Stockitem.Add(stockitem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockitem", new { id = stockitem.StockitemId }, stockitem);
        }

        // DELETE: api/Stockitems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Stockitem>> DeleteStockitem(int id)
        {
            var stockitem = await _context.Stockitem.FindAsync(id);
            if (stockitem == null)
            {
                return NotFound();
            }

            _context.Stockitem.Remove(stockitem);
            await _context.SaveChangesAsync();

            return stockitem;
        }

        private bool StockitemExists(int id)
        {
            return _context.Stockitem.Any(e => e.StockitemId == id);
        }
    }
}
