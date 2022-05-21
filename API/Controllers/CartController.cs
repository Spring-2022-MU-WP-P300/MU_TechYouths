using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Net;
using Microsoft.AspNetCore.Http;
using API.DataAccess;

namespace API.Controllers
{
    
    public class CartController : BaseController
    {
        private readonly dbContext db;
        public CartController(dbContext dbo)
        {
            db = dbo;
        }
        
        [HttpGet(Name = "get-cart")]
        public async Task<ActionResult<CartDA>> GetCart()
        {
            var cart = await getCart();
            return cart == null
                    ? NotFound()
                    : CartToCartDA(cart);
        }

        private async Task<Cart> getCart()
        {
            return await db.Carts
                            .Include(item => item.CartItems)
                            .ThenInclude(item => item.Product)
                            .FirstOrDefaultAsync(x => x.ClientId == Request.Cookies["clientId"]);

        }

        [HttpPost]
        public async Task<ActionResult<CartDA>> AddCart(int productId, int quantity = 1)
        {
            var cart = await getCart();
            if (cart == null)
            {
                cart = CreateCart();
            }

            var product = await db.Products.FindAsync(productId);
            if (product == null )return NotFound();

            cart.AddItem(product, quantity);

            return await db.SaveChangesAsync() > 0 
                ? CreatedAtRoute("get-cart", CartToCartDA(cart))
                : BadRequest();
        }

        private Cart CreateCart ()
        {
            var clientId = Guid.NewGuid().ToString();
            var cookiesOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(90)};
            Response.Cookies.Append("clientId", clientId, cookiesOptions);
            var cart  = new Cart { ClientId = clientId };
            db.Carts.Add(cart);
            return cart;
        }

         [HttpDelete]
        public async Task<ActionResult> DeleteCart(int productId, int quantity = 1)
        {
            var cart = await getCart();

             if (cart == null)
            {
                return NotFound();
            }

            cart.RemoveItem(productId, quantity);

            var response = await db.SaveChangesAsync() > 0;

            return  response
                ?  Ok()
                : BadRequest();
        }

        private CartDA CartToCartDA (Cart cart)
        {
           return  new CartDA {
                        Id = cart.Id,
                        ClientId = cart.ClientId,
                        Items = cart.CartItems.Select(item => new CartDAItem
                        {
                            ProductId = item.ProductId,
                            Name = item.Product.Name,
                            Price = item.Product.Price,
                            PictureUrl = item.Product.PictureUrl,
                            Type = item.Product.Type,
                            Brand = item.Product.Brand,
                            Description = item.Product.Description,
                            CurrentQuantity = item.Quantity,
                            Warranty = item.Product.Warranty                            
                        }).ToList()
                    };
        }
    }
}