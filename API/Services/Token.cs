using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class Token
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;

        public Token(UserManager<User> userManager, IConfiguration config)
        {
            this.userManager = userManager;
            this.config = config;
        }

        public async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await userManager.GetRolesAsync(user);

            foreach (var currentRole in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, currentRole));    
            }

            // We have to ensure this key never leaves server. It must be in the safest place.
            // NB: https://stackoverflow.com/questions/47279947/idx10603-the-algorithm-hs256-requires-the-securitykey-keysize-to-be-greater
            // For the secret key name we have to provide enough characters.
            // It has been written in the appsettings.Development.json file.
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:TokenKey"]));

            var signInCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken
            (
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: signInCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
