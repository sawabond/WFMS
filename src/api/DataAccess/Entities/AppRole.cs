using DataAccess.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities;

public class AppRole : IdentityRole, IEntity<string>
{
    public ICollection<AppUser> Users { get; set; } = new List<AppUser>();
}
