using DataAccess;
using DataAccess.Abstractions;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services.Repositories;

internal sealed class WindFarmRepository : Repository<WindFarm, int>, IWindFarmRepository
{
    public WindFarmRepository(ApplicationContext context) : base(context)
    {
        
    }

    private DbSet<WindFarm> WindFarms => Context.WindFarms;

    public async Task<IEnumerable<WindFarm>> GetAllWindFarmsIncludingAll()
    {
        return await WindFarms
            .Include(x => x.WindTurbines)
            .ThenInclude(x => x.TurbineSnapshots)
            .Include(x => x.PowerPlantStatuses)
            .ToListAsync();
    }
}