namespace API.DataAccess
{
    public class CartDAItem
    {
        public int ProductId { get; set; }
        public string Name {get; set; }
        public int Price {get; set;}
        public string Description {get; set;}
        public string Type {get; set;}
        public string Brand {get; set;}
        public int CurrentQuantity {get; set;}
        public string PictureUrl {get; set;}
        public string Warranty { get; set; }
    }
}