using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions options) : base(options)
        {

        }   

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
    }
}