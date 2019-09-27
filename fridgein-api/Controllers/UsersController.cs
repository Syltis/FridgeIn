using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fridgein_api.Models;

namespace fridgein_api.Controllers
{
    [Route("api/user/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly FridgeInDbContext _context;

        public UsersController(FridgeInDbContext context)
        {
            _context = context;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/user/
        [HttpPost]
        public async Task<ActionResult<User>> PostNewUser(User user)
        {
            try
            {
                var existingUser = await _context.User.Where(u => u.Email == user.Email).FirstAsync();
                return Ok(existingUser); // this has to return the full user
            }
            catch (InvalidOperationException)
            {
                _context.User.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.UserId }, user);
            }
        }
    }
}
