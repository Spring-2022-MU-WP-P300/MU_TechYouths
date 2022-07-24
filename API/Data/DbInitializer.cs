using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            }

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Amber Swivel Chair",
                    Description =
                        "It is just so cute and comfy and will add a touch of style and soft touch to other deocors and furnitures.",
                    Price = 20000,
                    PictureUrl = "/images/Amber-Swivel-Chair.webp",
                    Brand = "ELiving",
                    Type = "Fabric Sofa",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Living Room Interior",
                    Description = "Scandinavia, Serbia and Montenegro, Living Room, Home Interior, Modern.",
                    Price = 15000,
                    PictureUrl = "/images/living-room-interior.jpg",
                    Brand = "ELiving",
                    Type = "Fabric Sofa",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dining Chair",
                    Description =
                        "comfy and will add a touch of style, Dining Chair, Home Interior, Modern.",
                    Price = 18000,
                    PictureUrl = "/images/dining-chair.jpg",
                    Brand = "ARC",
                    Type = "Chair",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Bedside Table",
                    Description = "Bedside Table, Home Interior, Modern.",
                    Price = 30000,
                    PictureUrl = "/images/bedside-table.jpg",
                    Brand = "Jahan",
                    Type = "Table",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cuppa Desk",
                    Description = "Modern Home & Office table.",
                    Price = 12000,
                    PictureUrl = "/images/cuppa-desk.jpg",
                    Brand = "ARC",
                    Type = "Table",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Outdoor Bench",
                    Description = "Sanfir 2 Seater Outdoor comfy Bench.",
                    Price = 7000,
                    PictureUrl = "/images/outdoor-bench.jpg",
                    Brand = "ELiving",
                    Type = "Chair",
                    QuantityInStock = 100
                },
                new Product
                {
                     Name = "Leather Office Chair",
                    Description = "High Back PU Leather Office Chair.",
                    Price = 8000,
                    PictureUrl =  "/images/office-chair.jpg",
                    Brand = "ELiving",
                    Type = "Chair",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Media Storage Cabinet",
                    Description = "Sven Multimedia Cabinet is a careful curation of confident works in rich textures and harmonising colours. A collection of home furniture designed for the contemporary lifestyle by contemporary makers, thinkers, and dreamers.",
                    Price = 15000,
                    PictureUrl = "/images/media-storage-cabinet.jpg",
                    Brand = "ELiving",
                    Type = "Storage",
                    QuantityInStock = 100
                },
                new Product
                {
                   Name = "3 Seater Sofa",
                    Description = "Comfy 3 Seater Sofa.",
                    Price = 5800,
                    PictureUrl = "/images/3-seater-sofa.jpg",
                    Brand = "ELiving",
                    Type = "Sofa",
                    QuantityInStock = 100
                },
                new Product
                {
                     Name = "Dining Set",
                    Description = "Your dining table provides you with the best place ad environment where you can sit, eat and talk with your family. So, why not have a dining table which provides enough space to accommodate six people.",
                    Price = 10000,
                    PictureUrl = "/images/dining-set.jpg",
                    Brand = "TikiTaka",
                    Type = "Dining",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Twin Bed",
                    Description = "Comfy Twin Bed.",
                    Price = 9600,
                    PictureUrl = "/images/twin-bed.webp",
                    Brand = "Fprever",
                    Type = "Bed",
                    QuantityInStock = 100
                },              
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}