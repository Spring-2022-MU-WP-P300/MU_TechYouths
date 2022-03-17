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
                    Name = "A",
                    Description = "asdf",
                    Price = 20000,
                    Type = "Chair",
                    Brand = "Toefl",
                    CurrentQuantity = 5,
                    PictureUrl = "/images/chairs/chair-1.webp"
                }
            };

            foreach (var p in products) {
                context.Products.Add(p);
            }

            context.SaveChanges();
        }
    }
}