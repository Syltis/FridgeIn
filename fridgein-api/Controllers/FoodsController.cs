using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fridgein_api.Models;
using Microsoft.AspNetCore.Cors;
using System.Diagnostics;

namespace fridgein_api.Controllers
{
    [Route("api/food")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly FridgeInDbContext _context;
        private readonly StockitemsController _stockitemsController;

        public FoodsController(FridgeInDbContext context, StockitemsController stockitemsController)
        {
            _context = context;
            _stockitemsController = stockitemsController;
        }

        // GET: api/food/readall
        [HttpGet]
        [Route("readall")]
        public async Task<ActionResult<IEnumerable<Food>>> GetFood()
        {
            return await _context.Food.Include(f => f.Stockitem).ToListAsync();
        }

        // GET: api/food/readall
        [HttpGet]
        [Route("readallonuser/{userId}")]
        public async Task<ActionResult<IEnumerable<Food>>> GetFoodOnUser(int userId)
        {
            return await _context.Food.Where(f => f.UserId == userId).Include(f => f.Stockitem).ToListAsync();
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

        // POST: api/food/post
        // This cannot allow duplicates, food should be unique
        [HttpPost]
        [Route("post")]
        public async Task<ActionResult<Food>> PostFood(Food food)
        {
            if (_context.Food.Any(f => f.Name == food.Name))
            {
                ICollection<Food> foodList = await _context.Food.Include(f => f.Stockitem).ToListAsync();
                
                foreach (var foodItem in foodList)
                {
                    if (foodItem.Name.Equals(food.Name))
                    {
                        
                        foreach (var item in food.Stockitem)
                        {
                            item.FoodId = foodItem.FoodId;
                            _context.Stockitem.Add(item);
                        }
                        await _context.SaveChangesAsync();
                        return Ok(food);
                    }
                }
                Debug.WriteLine("------- OH BOI -----");
                return Ok(); // Fix this
            }
            else
            {
                _context.Food.Add(food);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFood", new { id = food.FoodId }, food);
            }
        }

        // Delete on Id
        // DELETE: api/food/5
        [HttpDelete("del/{id}")]
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

        // Delete all on food name 
        // DELETE api/food/delallname/eple
        [HttpDelete("delallname/{name}")]
        public async Task<ActionResult<Food>> DeleteAllFoodName(string name)
        {
            _context.Food.RemoveRange(_context.Food.Where(s => s.Name == name));
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool FoodExists(int id)
        {
            return _context.Food.Any(e => e.FoodId == id);
        }

    }
}
