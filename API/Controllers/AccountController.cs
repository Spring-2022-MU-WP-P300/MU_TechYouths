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

        public AccountController(UserManager<User> userManager, Token token)
        {
            // db = context;
            this.userManager = userManager;
            this.token = token;
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

            // We are creating a token and return it the user.
            return new UserAccess
            {
                Email = user.Email,
                Token = await token.GenerateToken(user),
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
    }
}