using API.Entities;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class InitializeDatabase
    {
        public static async Task Initialize(dbContext context, UserManager<User> userManager)
        {
            if (userManager.Users.Count() == 0)
            {            
                // warn: Microsoft.AspNetCore.Identity.UserManager
                // PasswordRequiresNonAlphanumeric;PasswordRequiresDigit;PasswordRequiresUpper.
                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@example.com",
                };
                await userManager.CreateAsync(admin, "adminA1@");
                await userManager.AddToRolesAsync(admin, new[] {"General", "Admin"});

                var user = new User
                {
                    UserName = "jerry",
                    Email = "jerry@example.com",
                };
                await userManager.CreateAsync(user, "jerryA1@");
                await userManager.AddToRolesAsync(user, new[] {"General"});
            }

            if (context.Products.Any())
            {
                return;
            }

            var products = new List<Product>
            {
                new Product 
                {
                    Name = "Amber Swivel Chair",
                    Description = "It is just so cute and comfy and will add a touch of style and soft touch to other deocors and furnitures.",
                    Price = 10000,
                    Type = "Fabric Sofa",
                    Brand = "Swivel",
                    CurrentQuantity = 10,
                    PictureUrl = "/images/Amber-Swivel-Chair.webp",
                    Warranty = "Frame and Mechanism 3 Years, Foam & Fabric 1 Year",                   
                },
                new Product 
                {
                    Name = "Living Room Interior",
                    Description = "Scandinavia, Serbia and Montenegro, Living Room, Home Interior, Modern.",
                    Price = 50000,
                    Type = "Fabric Sofa",
                    Brand = "Swivel",
                    CurrentQuantity = 10,
                    PictureUrl = "/images/living-room-interior.jpg",
                    Warranty = "Frame and Mechanism 3 Years, Foam & Fabric 1 Year",                   
                },
                new Product 
                {
                    Name = "Dining Chair",
                    Description = "comfy and will add a touch of style, Dining Chair, Home Interior, Modern.",
                    Price = 3000,
                    Type = "Chair",
                    Brand = "ELiving",
                    CurrentQuantity = 10,
                    PictureUrl = "/images/dining-chair.jpg",
                    Warranty = "Frame and Mechanism 3 Years, Foam & Fabric 1 Year",                   
                },
                 new Product 
                {
                    Name = "Bedside Table",
                    Description = "Bedside Table, Home Interior, Modern.",
                    Price = 15000,
                    Type = "Table",
                    Brand = "ELiving",
                    CurrentQuantity = 20,
                    PictureUrl = "/images/bedside-table.jpg",
                    Warranty = "Frame and Mechanism 1 Years",                   
                },
                new Product 
                {
                    Name = "Cuppa Desk",
                    Description = "Modern Home & Office table.",
                    Price = 8000,
                    Type = "Table",
                    Brand = "ELiving",
                    CurrentQuantity = 10,
                    PictureUrl = "/images/cuppa-desk.jpg",
                    Warranty = "Frame and Mechanism 5 Years",                
                },
                new Product 
                {
                    Name = "Outdoor Bench",
                    Description = "Sanfir 2 Seater Outdoor comfy Bench.",
                    Price = 15000,
                    Type = "Chair",
                    Brand = "ELiving",
                    CurrentQuantity = 12,
                    PictureUrl = "/images/outdoor-bench.jpg",
                    Warranty = "Frame and Mechanism 3 Years",                
                },
                new Product 
                {
                    Name = "Leather Office Chair",
                    Description = "High Back PU Leather Office Chair.",
                    Price = 20000,
                    Type = "Chair",
                    Brand = "ELiving",
                    CurrentQuantity = 9,
                    PictureUrl = "/images/office-chair.jpg",
                    Warranty = "Frame and Mechanism 1 Years",                
                },
                new Product 
                {
                    Name = "Media Storage Cabinet",
                    Description = "Sven Multimedia Cabinet is a careful curation of confident works in rich textures and harmonising colours. A collection of home furniture designed for the contemporary lifestyle by contemporary makers, thinkers, and dreamers.",
                    Price = 30000,
                    Type = "Storage",
                    Brand = "ELiving",
                    CurrentQuantity = 5,
                    PictureUrl = "/images/media-storage-cabinet.jpg",
                    Warranty = "Frame and Mechanism 4 Years.",                
                },
                new Product 
                {
                    Name = "3 Seater Sofa",
                    Description = "Comfy 3 Seater Sofa.",
                    Price = 50000,
                    Type = "Sofa",
                    Brand = "ELiving",
                    CurrentQuantity = 10,
                    PictureUrl = "/images/3-seater-sofa.jpg",
                    Warranty = "Frame and Mechanism 4 Years, Foam & Fabric 1 Year.",
                },
                new Product 
                {
                    Name = "Dining Set",
                    Description = "Your dining table provides you with the best place ad environment where you can sit, eat and talk with your family. So, why not have a dining table which provides enough space to accommodate six people.",
                    Price = 50000,
                    Type = "Dining",
                    Brand = "ELiving",
                    CurrentQuantity = 4,
                    PictureUrl = "/images/dining-set.jpg",
                    Warranty = "Frame and Mechanism 4 Years.",                
                },
                new Product 
                {
                    Name = "Twin Bed",
                    Description = "Comfy 3 Seater Sofa.",
                    Price = 18000,
                    Type = "Bed",
                    Brand = "ELiving",
                    CurrentQuantity = 8,
                    PictureUrl = "/images/twin-bed.webp",
                    Warranty = "Frame and Mechanism 4 Years, Fabric 1 Year.",
                },
            };

            foreach (var p in products) {
                context.Products.Add(p);
            }

            context.SaveChanges();
        }
    }
}