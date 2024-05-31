using GestionInventarios.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionInventarios.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Inventory> Inventories { get; set; }
    }
}
