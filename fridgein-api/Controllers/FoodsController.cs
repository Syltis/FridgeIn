﻿using System;
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

        public FoodsController(FridgeInDbContext context)
        {
            _context = context;
        }

        // GET: api/food/readall
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetFood()
        {
            return await _context.Food.Include(f => f.Stockitem).ToListAsync();
        }

        // GET: api/Foods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Food>> GetFood(int id)
        {
            var food = await _context.Food.Include(f => f.Stockitem).SingleOrDefaultAsync(f => f.FoodId == id);
            Console.WriteLine("Using GET method");
            Console.WriteLine(food);
            if (food == null)
            {
                return NotFound();
            }

            return food;
        }

        // GET: api/food/readall
        [HttpGet]
        [Route("readallonuser/{userId}")]
        public async Task<ActionResult<IEnumerable<Food>>> GetFoodOnUser(int userId)
        {
            return await _context.Food.Where(f => f.UserId == userId).Include(f => f.Stockitem).ToListAsync();
        }

        // POST: api/food/post
        // This cannot allow duplicates, food should be unique
        [HttpPost]
        public async Task<ActionResult<Food>> PostFood(Food food)
        {
            if (_context.Food.Any(f => f.Name == food.Name && f.UserId == food.UserId)) 
            {
                ICollection<Food> foodList = await _context.Food.Include(f => f.Stockitem).ToListAsync();
                
                foreach (var foodItem in foodList)
                {
                    if (foodItem.Name == food.Name && foodItem.UserId == food.UserId)
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

                return Ok(food);
                //return CreatedAtAction("GetFood", new { id = food.FoodId }, food);
            }
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
