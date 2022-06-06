using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DataAccess;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{     
    public class AccountController : BaseController
    {
        private readonly UserManager<User> userManager;
        private readonly Token token;
        private readonly dbContext db;

        public AccountController(UserManager<User> userManager, Token token, dbContext context)
        {
            db = context;
            this.token = token;
            this.userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserAccess>> Login(LoginAccess loginAccess)
        {
            var user = await userManager.FindByNameAsync(loginAccess.Username);

            if (user == null) {
                return Unauthorized();
            }

            if (await userManager.CheckPasswordAsync(user, loginAccess.Password) == false)
            {
                return Unauthorized();
            }

            // var userCart = await GetCart(loginAccess.Username);
            // var anonCart = await GetCart(Request.Cookies["clientId"]);

            // if (anonCart != null)
            // {
            //     if (userCart != null) db.Carts.Remove(userCart);
            //     anonCart.ClientId = user.UserName;
            //     Response.Cookies.Delete("clientId");
            //     await db.SaveChangesAsync();
            // }

            return new UserAccess
            {
                Email = user.Email,
                Token = await token.GenerateToken(user),
                // Cart = anonCart != null ? anonCart.MapCartToDA() : userCart?.MapCartToDA()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterAccess registerAccess)
        {
            var user = new User
            {
                UserName = registerAccess.Username,
                Email = registerAccess.Email
            };

            var res = await userManager.CreateAsync(user, registerAccess.Password);

            if (!res.Succeeded)
            {
                // foreach (var e in res.Errors)
                // {
                //     ModelState.AddModelError(e.Code, e.Description);
                // }

                return ValidationProblem();
            }

            await userManager.AddToRoleAsync(user, "General");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserAccess>> GetCurrentUser()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);

            // var userCart = await GetCart(User.Identity.Name);

            return new UserAccess
            {
                Email = user.Email,
                Token = await token.GenerateToken(user)
                // Cart = userCart?.MapCartToDto()
            };
        }

        // private async Task<Cart> GetCart(string clientId)
        // {
        //     if (string.IsNullOrEmpty(clientId))
        //     {
        //         Response.Cookies.Delete("clientId");
        //         return null;
        //     }

        //     return await db.Carts
        //         .Include(i => i.Items)
        //         .ThenInclude(p => p.Product)
        //         .FirstOrDefaultAsync(x => x.ClientId == clientId);
        // }
    }
}