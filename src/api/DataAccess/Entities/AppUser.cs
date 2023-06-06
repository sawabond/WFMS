﻿using DataAccess.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities;

public class AppUser : IdentityUser, IEntity<string>
{
    public ICollection<WindFarm> Farms { get; set; } = new List<WindFarm>();

    public ICollection<AppRole> Roles { get; set; } = new List<AppRole>();
}
