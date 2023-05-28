using DataAccess.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class ApplicationContext : IdentityDbContext<AppUser, AppRole, string>
{
	public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
	{
		Database.EnsureCreated();
	}

	public DbSet<WindFarm> WindFarms { get; set; }

	public DbSet<WindFarmSnapshot> WindFarmSnapshots { get; set; }
	
	public DbSet<Turbine> Turbines { get; set; }

	public DbSet<TurbineSnapshot> TurbineSnapshots { get; set; }

}
