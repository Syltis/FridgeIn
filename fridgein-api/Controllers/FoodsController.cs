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
    [Route("api/food")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly FridgeInDbContext _context;

        public FoodsController(FridgeInDbContext context)
        {
            _context = context;
        }

        // GET: api/food/readall
        [HttpGet]
        [Route("readall")]
        public async Task<ActionResult<IEnumerable<Food>>> GetFood()
        {
            return await _context.Food.Include(f => f.Stockitem).ToListAsync();
        }

        // GET: api/food/5
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Food>> GetFood(int id)
        {
            var food = await _context.Food.FindAsync(id);

            if (food == null)
            {
                return NotFound();
            }

            return food;
        }

        // PUT: api/food/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFood(int id, Food food)
        {
            if (id != food.FoodId)
            {
                return BadRequest();
            }

            _context.Entry(food).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodExists(id))
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

        // POST: api/food/post
        [HttpPost]
        [Route("post")]
        public async Task<ActionResult<Food>> PostFood(Food food)
        {
            _context.Food.Add(food);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFood", new { id = food.FoodId }, food);
        }

        // DELETE: api/food/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Food>> DeleteFood(int id)
        {
            var food = await _context.Food.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }

            _context.Food.Remove(food);
            await _context.SaveChangesAsync();

            return food;
        }

        private bool FoodExists(int id)
        {
            return _context.Food.Any(e => e.FoodId == id);
        }
    }
}
