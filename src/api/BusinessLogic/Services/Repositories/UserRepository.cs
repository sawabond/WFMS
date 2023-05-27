using DataAccess;
using DataAccess.Abstractions;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services.Repositories;

internal sealed class UserRepository : Repository<AppUser, string>, IUserRepository
{
    public UserRepository(ApplicationContext context) : base(context) { }

    private DbSet<AppUser> Users => Context.Users;

    public Task<AppUser> GetUserIncludingAll(string id)
    {
        return Users
            .Include(x => x.Farms)
            .ThenInclude(x => x.WindTurbines)
            .ThenInclude(x => x.TurbineSnapshots)
            .Include(x => x.Farms)
            .ThenInclude(x => x.PowerPlantStatuses)
            .FirstOrDefaultAsync(x => x.Id == id);
    }
}
