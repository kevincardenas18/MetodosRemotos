namespace GestionInventarios.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public required string Product { get; set; }
        public required int Stock { get; set; }
    }
}
