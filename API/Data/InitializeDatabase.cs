using API.Entities;
using System.Linq;
using System.Collections.Generic;

namespace API.Data
{
    public static class InitializeDatabase
    {
        public static void Initialize(dbContext context)
        {
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
                    Price = 20000,
                    Type = "Fabric Sofa",
                    Brand = "Swivel",
                    CurrentQuantity = 5,
                    PictureUrl = "/images/chairs/Amber-Swivel-Chair.webp",
                    Warranty = "Frame and Mechanism 3 Years, Foam & Fabric 1 Year",                   
                },
                new Product 
                {
                    Name = "Living Room Interior",
                    Description = "Scandinavia, Serbia and Montenegro, Living Room, Home Interior, Modern.",
                    Price = 10000,
                    Type = "Fabric Sofa",
                    Brand = "Swivel",
                    CurrentQuantity = 10,
                    PictureUrl = "/images/chairs/living-room-interior.jpg",
                    Warranty = "Frame and Mechanism 3 Years, Foam & Fabric 1 Year",                   
                },
            };

            foreach (var p in products) {
                context.Products.Add(p);
            }

            context.SaveChanges();
        }
    }
}