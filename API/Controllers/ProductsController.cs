using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using API.DataAccess;
using System.Text.Json;

namespace API.Controllers
{
    
    public class ProductsController : BaseController
    {
        private readonly dbContext db;
        public ProductsController(dbContext dbo)
        {
            db = dbo;
        }
        
        [HttpGet]
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery]ProductParameters param)
        {
            var query = db.Products.AsQueryable();

            query = param.OrderBy switch
            {
                "priceASC" => query.OrderBy(p => p.Price),
                "priceDSC" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            var brandList = new List<string>();
            var typeList = new List<string>();
            if (!string.IsNullOrEmpty(param.Brands))
            {
                brandList.AddRange(param.Brands.ToLower().Split(",").ToList());
            }

            if (!string.IsNullOrEmpty(param.Types))
            {
                typeList.AddRange(param.Types.ToLower().Split(",").ToList());
            }

            query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
            query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));
            
            if (!string.IsNullOrEmpty(param.Search)){
                var lowerCase = param.Search.Trim().ToLower();
                query = query.Where(x => x.Name.ToLower().Contains(param.Search));
            }

            var curProducts = await PageList<Product>.ToPageList(query, param.PageNumber, param.PageSize);

            var opt = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            Response.Headers.Add("Paging", JsonSerializer.Serialize(curProducts.Data, opt));
            Response.Headers.Add("Access-Control-Expose-Headers", "Paging");

            return curProducts;
        }

        [HttpGet("{id}")] // api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var types = await db.Products.Select(p => p.Type).Distinct().ToListAsync();
            var brands = await db.Products.Select(p => p.Brand).Distinct().ToListAsync();
            return Ok(new {brands, types});
        }
    }
}