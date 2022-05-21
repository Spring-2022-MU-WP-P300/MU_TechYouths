namespace API.DataAccess
{
    public class ProductParameters : Paging
    {
        public string Brands {get; set;}
        public string Types {get; set;}
        public string Search {get; set;}
        public string OrderBy {get; set;}
    }
}