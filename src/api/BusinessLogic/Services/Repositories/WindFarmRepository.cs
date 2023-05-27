using DataAccess;
using DataAccess.Abstractions;
using DataAccess.Entities;

namespace BusinessLogic.Services.Repositories;

internal sealed class WindFarmRepository : Repository<WindFarm, int>, IWindFarmRepository
{
    public WindFarmRepository(ApplicationContext context) : base(context)
    {
        
    }
}