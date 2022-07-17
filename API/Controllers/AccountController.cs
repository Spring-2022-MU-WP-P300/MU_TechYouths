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

        public AccountController(UserManager<User> userManager, Token token, dbContext dbo)
        {
            // db = context;
            this.userManager = userManager;
            this.token = token;
            this.db = dbo;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserAccess>> Login(LoginAccess loginAccess)
        {
            var user = await userManager.FindByNameAsync(loginAccess.Username);

            if (user == null) {
                return Unauthorized();
            }

            if (!await userManager.CheckPasswordAsync(user, loginAccess.Password))
            {
                return Unauthorized();
            }

            var userCart = await getCart(loginAccess.Username);
            var anonCart = await getCart(Request.Cookies["clientId"]);

            if (anonCart != null)
            {
                if (userCart != null) {
                    db.Carts.Remove(userCart);                    
                }
                anonCart.ClientId = user.UserName;
                Response.Cookies.Delete("clientId");
                await db.SaveChangesAsync();
            }

            // We are creating a token and return it the user.
            return new UserAccess
            {
                Email = user.Email,
                Token = await token.GenerateToken(user),
                Cart = anonCart != null ? CartToCartDA(anonCart) : CartToCartDA( userCart)
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

            return new UserAccess
            {
                Email = user.Email,
                Token = await token.GenerateToken(user)
            };
        }

        private async Task<Cart> getCart(string clientId)
        {
            if (string.IsNullOrEmpty(clientId))
            {
                Response.Cookies.Delete("clientId");
                return null;
            }

            return await db.Carts
                            .Include(item => item.CartItems)
                            .ThenInclude(item => item.Product)
                            .FirstOrDefaultAsync(x => x.ClientId == clientId);

        }

        private CartDA CartToCartDA (Cart cart)
        {
           return  new CartDA {
                        Id = cart.Id,
                        ClientId = cart.ClientId,
                        Items = cart.CartItems.Select(item => new CartDAItem
                        {
                            ProductId = item.ProductId,
                            Name = item.Product.Name,
                            Price = item.Product.Price,
                            PictureUrl = item.Product.PictureUrl,
                            Type = item.Product.Type,
                            Brand = item.Product.Brand,
                            Description = item.Product.Description,
                            CurrentQuantity = item.Quantity,
                            Warranty = item.Product.Warranty                            
                        }).ToList()
                    };
        }
    }
}