using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly dbContext db;
        public ProductsController(dbContext dbo)
        {
            db = dbo;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await db.Products.ToListAsync();
        }

        [HttpGet("{id}")] // api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await db.Products.FindAsync(id);
        }
    }
}