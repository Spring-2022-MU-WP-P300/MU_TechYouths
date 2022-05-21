using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int Id {get; set;}
        public string ClientId {get; set;}
        public List<CartItem> CartItems {get; set;} = new();

        public void AddItem (Product product, int quantity = 1)
        {
            if (CartItems.All(item => item.ProductId != product.Id))
            {
                CartItems.Add(new CartItem{Product = product, Quantity = quantity});
                return;
            }

            var curItem = CartItems.FirstOrDefault(item => item.ProductId == product.Id);
            if (curItem == null)
            {
                return;
            }          
            curItem.Quantity += quantity;  
        }

        public void RemoveItem (int productId, int quantity = 1)
        {   
            var curItem = CartItems.FirstOrDefault(item => item.ProductId == productId);
            if (curItem == null) return;
            curItem.Quantity -= quantity;

            // CartItems = CartItems.Where(item => item.ProductId != productId).Select(item => item).ToList();

            if (curItem.Quantity <= 0) {
                CartItems.Remove(curItem);
            }
        }
    }
}