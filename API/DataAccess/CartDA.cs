using System.Collections.Generic;

namespace API.DataAccess
{
    public class CartDA
    {
        public int Id {get; set;}
        public string ClientId {get; set;}
        
        public List<CartDAItem> Items {get; set;}
    }
}