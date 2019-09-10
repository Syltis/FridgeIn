﻿using System;
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

        // GET: api/stockitem/readall
        [HttpGet]
        [Route("readall")]
        public async Task<ActionResult<IEnumerable<Stockitem>>> GetStockitem()
        {
            return await _context.Stockitem.Include(s => s.Food).ToListAsync();
        }

        // GET: api/stockitem/readunique
        [HttpGet]
        [Route("readunique")]
        public async Task<ActionResult<IEnumerable<Stockitem>>> GetUniqueStockitem()
        {
            // Get list of all stockitems
            ICollection<Stockitem> allItems = await _context.Stockitem.Include(s => s.Food).ToListAsync();

            List<Stockitem> distinctItems = allItems
                .GroupBy(s => new { s.FoodId, s.PurchaseDate, s.ExpirationDate })
                .Select(g => g.First())
                .ToList();

            // Group by chosen fiels
            var grouped = allItems.GroupBy(x => new { x.FoodId, x.PurchaseDate, x.ExpirationDate });
           

            return Ok(grouped);
        }

        // GET: api/stockitem/get/5
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

        // PUT: api/stockitem/5
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

        // POST: api/stockitem/post
        [HttpPost]
        [Route("post")]
        public async Task<ActionResult<Stockitem>> PostStockitem(Stockitem stockitem)
        {
            _context.Stockitem.Add(stockitem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockitem", new { id = stockitem.StockitemId }, stockitem);
        }

        // DELETE: api/stockitem/del/5
        [HttpDelete("del/{id}")]
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

        // DELETE: api/stockitem/delall/5
        [HttpDelete("delall/{id}")]
        public async Task<ActionResult<Stockitem>> DeleteAllStockitems(int id)
        {
             _context.Stockitem.RemoveRange(_context.Stockitem.Where(s => s.Food.FoodId == id));
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool StockitemExists(int id)
        {
            return _context.Stockitem.Any(e => e.StockitemId == id);
        }
    }
}
