using System;

namespace API.DataAccess
{
    public class UserAccess
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public CartAccess Basket { get; set; }
    }
}