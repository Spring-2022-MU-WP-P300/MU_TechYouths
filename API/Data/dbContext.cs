using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data
{
    public class dbContext : IdentityDbContext<User>
    {
        public dbContext(DbContextOptions options) : base(options) {}

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Product> Products { get; set; }

         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "General", NormalizedName = "GENERAL" }
            );
        }
    }
}